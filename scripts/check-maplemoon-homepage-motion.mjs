#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const homepage = new URL(
  "../_wip/homepage_real_1_lead_photo.WIP.html",
  import.meta.url,
);
const html = readFileSync(homepage, "utf8");
const videoTag = html.match(/<video\b[^>]*class="hero-vid"[^>]*>/i)?.[0];
assert.ok(videoTag, "Homepage hero video tag is missing");
assert.ok(!/\bautoplay\b/i.test(videoTag), "Homepage hero video still autoplays");

const controller = html.match(
  /<script id="homepage-hero-motion-controller">([\s\S]*?)<\/script>/i,
)?.[1];
assert.ok(controller, "Homepage hero motion controller is missing");

function executeController(initiallyReduced) {
  const listeners = [];
  const video = {
    paused: true,
    pauseCalls: 0,
    playCalls: 0,
    pause() {
      this.pauseCalls += 1;
      this.paused = true;
    },
    play() {
      this.playCalls += 1;
      this.paused = false;
      return Promise.resolve();
    },
  };
  const media = {
    matches: initiallyReduced,
    addEventListener(type, listener) {
      if (type === "change") listeners.push(listener);
    },
  };
  const sandbox = {
    document: {
      currentScript: { previousElementSibling: video },
    },
    window: {
      matchMedia(query) {
        assert.equal(query, "(prefers-reduced-motion: reduce)");
        return media;
      },
    },
  };
  vm.runInNewContext(controller, sandbox, {
    filename: "homepage-hero-motion-controller",
  });
  return { listeners, media, video };
}

const reduced = executeController(true);
assert.equal(reduced.video.paused, true, "Initial reduced motion did not pause");
assert.equal(reduced.video.pauseCalls, 1, "Initial reduced motion pause count");
assert.equal(reduced.video.playCalls, 0, "Initial reduced motion attempted playback");

const live = executeController(false);
assert.equal(live.video.paused, false, "No-preference runtime did not request play");
assert.equal(live.video.playCalls, 1, "No-preference play count");
assert.equal(live.listeners.length, 1, "Motion preference listener is missing");
live.media.matches = true;
live.listeners[0]({ matches: true });
assert.equal(live.video.paused, true, "Live reduce preference did not pause");
assert.equal(live.video.pauseCalls, 1, "Live reduce pause count");

console.log(
  JSON.stringify(
    {
      autoplayAttribute: false,
      initialReducedMotionPaused: reduced.video.paused,
      livePreferenceChangePaused: live.video.paused,
    },
    null,
    2,
  ),
);

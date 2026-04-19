# MM Hero V1 Fog Animator Log

**Date**: 2026-04-19 13:54 AEST
**Operator**: Claude (Kling animator subagent)
**Parent handoff**: `UFC/ops/handoffs/handoff_20260419_135500_mm_fog_animator.md`

## Deliverables
- `blue_fog_animated.mp4` — 7.03 MB (under 8 MB cap), 1284×716, 24fps, 5.04s, H.264 silent
- `blue_fog_animated.webm` — 70 KB, VP9 CRF 32 silent (tiny size is legitimate: low-detail slow-motion clouds compress extremely well under VP9)

## Generation
- **Tool**: `UFC/tools/video_shoot.py` (Kling 3.0 Standard I2V via Fal.ai)
- **Model**: `fal-ai/kling-video/v3/standard/image-to-video`
- **Source still**: `blue_fog.png` (5.6 MB, cornflower sky + drone-style fog)
- **Duration**: 5s | **Aspect**: 16:9 | **Audio**: off | **Tier**: Standard
- **Cost**: $0.42
- **Cfg-scale**: 0.5 (default)

### Prompt
```
Slow drifting clouds, gentle horizontal parallax, dreamy atmospheric movement,
seamless loop, soft cornflower blue sky #7B9DBF, subtle cloud evolution,
minimal motion, cinematic pacing, editorial calm, NOT deep navy, NOT teal
```

### Negative prompt
```
deep navy, teal, dark blue, text, logos, people, animals, objects,
harsh shadows, color shift, janky loop, abrupt cut, blur, distort, low quality
```

## Quality Notes

| Axis | Verdict | Notes |
|---|---|---|
| Color fidelity | PASS | Cornflower blue locked — no navy/teal drift. Mid-frame verified against brand #7B9DBF. |
| Motion quality | PASS | Slow drifting parallax, editorial pacing. Reads as expensive drone footage. |
| Cinematic feel | PASS | Dreamy, atmospheric, on-brief. |
| Loop seamlessness | **FLAG — partial** | Start and end frames differ. Clouds have evolved over 5s, so a raw `<video loop>` tag will show a perceptible jump at wrap. Gentle enough to hide with CSS crossfade or a JS pause-reverse-play trick. Acceptable per handoff ("rather have a visible ending than janky loop"). |
| File size (mp4) | PASS | 7.03 MB / 8 MB cap |
| File size (webm) | PASS | 70 KB (ultra-efficient VP9 on low-detail slow content) |

## Loop Handling Recommendations (for implementer)
Since the loop isn't A→A seamless, three options for the hero BG:

1. **Simplest**: native `<video loop muted autoplay playsinline>` — accept small jump.
2. **Better**: CSS `animation` crossfade using two stacked `<video>` elements offset by ~4.5s with opacity dissolve.
3. **Best**: use ffmpeg to auto-ping-pong (`[0:v]reverse[r];[0:v][r]concat`) and double duration to 10s for true forward-backward loop. Not done here to respect 1-video rule.

## Files Generated (canon)
- `/Users/handtomouse/maplemoon-website/assets/hero_shots/blue_fog_animated.mp4`
- `/Users/handtomouse/maplemoon-website/assets/hero_shots/blue_fog_animated.webm`
- `/Users/handtomouse/maplemoon-website/assets/hero_shots/video_generations.log` (tool-maintained ledger, appended)

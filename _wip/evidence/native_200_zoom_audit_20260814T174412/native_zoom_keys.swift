import AppKit
import CoreGraphics
import Foundation

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data(("NATIVE_ZOOM_KEYS FAIL " + message + "\n").utf8))
    exit(1)
}

guard CommandLine.arguments.count == 4,
      let rawPid = Int32(CommandLine.arguments[1]),
      let count = Int(CommandLine.arguments[3]),
      count >= 1 else {
    fail("usage: native_zoom_keys.swift PID reset|in PID_COUNT")
}
let action = CommandLine.arguments[2]
guard action == "reset" || action == "in" else { fail("unsupported action \(action)") }
guard let app = NSRunningApplication(processIdentifier: rawPid), !app.isTerminated else {
    fail("target PID \(rawPid) is not a live application")
}
guard app.bundleIdentifier == "com.google.Chrome" else {
    fail("target PID \(rawPid) is not Google Chrome: \(app.bundleIdentifier ?? "nil")")
}

let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
guard let windowInfo = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as? [[String: Any]] else {
    fail("could not enumerate on-screen windows")
}
let owned = windowInfo.filter { item in
    guard let owner = item[kCGWindowOwnerPID as String] as? Int,
          let layer = item[kCGWindowLayer as String] as? Int,
          let alpha = item[kCGWindowAlpha as String] as? Double else { return false }
    return owner == Int(rawPid) && layer == 0 && alpha > 0
}
guard owned.count == 1 else {
    fail("target PID \(rawPid) must own exactly one on-screen layer-0 window; got \(owned.count)")
}
let bounds = owned[0][kCGWindowBounds as String] ?? "unknown"
let keyCode: CGKeyCode = action == "reset" ? 29 : 24
let flags: CGEventFlags = action == "reset" ? [.maskCommand] : [.maskCommand, .maskShift]

for _ in 0..<count {
    guard let down = CGEvent(keyboardEventSource: nil, virtualKey: keyCode, keyDown: true),
          let up = CGEvent(keyboardEventSource: nil, virtualKey: keyCode, keyDown: false) else {
        fail("could not create native key events")
    }
    down.flags = flags
    up.flags = flags
    down.postToPid(rawPid)
    usleep(30_000)
    up.postToPid(rawPid)
    usleep(300_000)
}

print("NATIVE_ZOOM_KEYS PASS pid=\(rawPid) action=\(action) count=\(count) windows=1 bounds=\(bounds)")

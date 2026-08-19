import CoreGraphics
import Foundation

guard CommandLine.arguments.count == 2, let rawPid = Int32(CommandLine.arguments[1]) else {
    fputs("usage: window_probe.swift PID\n", stderr)
    exit(1)
}
guard let info = CGWindowListCopyWindowInfo([.optionAll, .excludeDesktopElements], kCGNullWindowID) as? [[String: Any]] else {
    fputs("window enumeration failed\n", stderr)
    exit(1)
}
let records = info.filter { ($0[kCGWindowOwnerPID as String] as? Int) == Int(rawPid) }.map { item in
    [
        "number": item[kCGWindowNumber as String] ?? -1,
        "name": item[kCGWindowName as String] ?? "",
        "layer": item[kCGWindowLayer as String] ?? -1,
        "alpha": item[kCGWindowAlpha as String] ?? -1,
        "onscreen": item[kCGWindowIsOnscreen as String] ?? false,
        "bounds": item[kCGWindowBounds as String] ?? [:],
        "memory": item[kCGWindowMemoryUsage as String] ?? -1,
    ] as [String: Any]
}
let data = try JSONSerialization.data(withJSONObject: records, options: [.prettyPrinted, .sortedKeys])
print(String(data: data, encoding: .utf8)!)

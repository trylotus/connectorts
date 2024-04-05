import { loadManifest } from "../src/manifest";

test('loads manifest and checks values', function () {
    var m = loadManifest()
    expect(m['name']).toBe('candymachine')
    expect(m['author']).toBe('lotus')
})

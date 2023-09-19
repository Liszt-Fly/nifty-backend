enum specificPlatform {
    darwin_x86_64 = "darwin-x86_64",
    darwin_aarch64 = "darwin-aarch64",
    windows_x86_64 = "windows-x86_64"
}
interface platrform {
    [key: specificPlatform]: specificPlatform
    signature: string
    url: string

}

interface updater {
    version: string
    notes: string
    pub_date: string
    platforms: platrform[]
}

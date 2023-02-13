import * as fs from 'fs';
import { join } from 'path';
import { exec } from 'child_process'

export function createDescriptorFiles(dir: string) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            createDescriptorFiles(join(dir, file.name))
        } else {
            let fileSplit = file.name.split('.')[1]
            if (fileSplit.length == 2 && fileSplit[1] == 'proto') {
                let descPath = join(dir, file.name + ".desc")
                if (fs.existsSync(descPath)) {
                    console.debug(`${file.name + ".desc"} already exists, removing..`)
                    fs.unlinkSync(descPath)
                }

                let filePath = join(dir, file.name)

                let cmd = `protoc  --include_imports --proto_path=${dir} --descriptor_set_out=${descPath} ${filePath}`

                console.debug(`creating ${file.name + ".desc"}`)
                exec(cmd, (err) => {
                    if (err) console.error(`failed to create descriptor file for ${file.name}. error: ${err}`)
                });
            }

        }
    }
}

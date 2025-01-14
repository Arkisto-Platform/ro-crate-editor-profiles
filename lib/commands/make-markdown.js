const { Args, Command, Flags } = require('@oclif/core')
const { readFile, writeFile } = require("fs/promises")
const {Profile} = require('../profile.js');

class MakeMarkdown extends Command {
  static args = {
    mode_file: Args.string({ description: 'JSON mode file', required: true }),
    template_file: Args.string({ description: 'Markdown profile template, such as one generated by the make-template subcommand', required: true }),
  }

  static flags = {
    examples_dir: Flags.string({ default: "examples" }),
  }

  static description = 'Generates a complete markdown file for a given profile'

  static examples = [
    '<%= config.bin %> <%= command.id %> mode.json template.md',
  ]

  async run() {
    const { args, flags } = await this.parse(MakeMarkdown)

    const mode = JSON.parse(await readFile(args.mode_file, { encoding: "utf-8" }));

    this.log("profile.md", Profile.generateSpec(mode, args.template_file, flags.examples_dir));
  }
}

module.exports = MakeMarkdown

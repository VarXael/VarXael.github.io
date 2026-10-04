# {{TITLE}}

{{SUMMARY}}

## Context

This code is one part of a project. The design lives in the Obsidian vault, not here:

| What | Where |
| --- | --- |
| Project VarXel entry (what it is, its builds) | `Projects_Vault/Project VarXel/Entries/{{TITLE}}.md` |
| Workspace: handout, devlog, design notes | `Projects_Vault/Project VarXel/Workspaces/{{TITLE}}/` |
| Original notes (never edited) | `The Union/` (see the card's `sources`) |

## Running

- `Play.bat` plays it, `Open in Godot Editor.bat` opens the editor (Godot 4.7; set `GODOT` to point elsewhere).

## Publishing to the portfolio

From the portfolio repo (`VarXael.github.io`):

```
npm run publish-build -- "{{TITLE}}"
```

It exports the web and Windows builds and records them on the entry. While the project is private, both stay on this computer; once it is public (or in the portfolio), the web build goes on the site and the Windows zip to GitHub Releases. Builds go to `export/`, which git ignores.

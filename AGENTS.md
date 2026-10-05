# SAE website

This is a static HTML/CSS/JavaScript website hosted on GitHub Pages through
`.github/workflows/pages.yml`. Keep relative URLs compatible with `/web/`.

## Design skills

All 14 design skills from the noobchess project are installed in
`.agents/skills/`, including their supporting references, scripts, and binaries.
`skills-lock.json` preserves the source metadata supplied by that project.
Read a skill's `SKILL.md` before applying it. Select skills appropriate to the
user's brief; do not combine conflicting visual styles automatically. The
user's requested reference and explicit preferences take precedence.

For the pending makeover, study https://www.aspensearch.com/ visually and
adapt its design to SAE's content. Do not carry over the reference site's
business claims. Use the existing team logo; do not invent team members,
awards, event results, contact details, or social accounts.

## Design checks

Impeccable's PostToolUse and Stop hooks are configured in `.codex/hooks.json`.
Codex may require the user to approve those hooks through `/hooks` before
automatic execution. If hooks are unavailable, run the appropriate manual
design checks via `.agents/skills/impeccable/scripts/impeccable`.

The Pages workflow stages only site files; agent skills and hook configuration
are not included in the deployed website. Keep that separation when changing
the deployment workflow.

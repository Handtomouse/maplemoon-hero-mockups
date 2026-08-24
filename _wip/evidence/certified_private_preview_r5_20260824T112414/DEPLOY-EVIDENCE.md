# Certified private preview R5 deployment evidence

- Exact command run once: `vercel deploy --yes`
- Exit: `0`
- Project: `handtomouses-projects/maplemoon_build_20260813`
- Project ID: `prj_uyvhJMmqX5hq2mFxzLUKu3sxqyzn`
- Immutable preview URL: `https://maplemoonbuild20260813-j9pef6x3q-handtomouses-projects.vercel.app`
- Deployment ID: `dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj`
- Target/status: `preview` / `Ready`
- Created: `2026-08-24 11:26:08 AEST`
- Production commands: none (`--prod`, promote, alias, rollback and protection changes were not run)

Authenticated byte verification:

```text
REMOTE_BYTES PASS deployment=dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj files=16/16 status200=16/16 nonblank=16/16 byte_equal=16/16
```

Anonymous qualification:

```text
VERDICT: FAIL - VERCEL SSO WALL.
```

This is expected for the existing protected private-review project. Protection was not changed and the URL is not anonymously client-shareable.

Final production freeze inspection:

```text
id      dpl_G2LER2awaqyFtGRCcTserXbNynct
target  production
status  Ready
url     https://maplemoonbuild20260813-7vjf2m50b-handtomouses-projects.vercel.app
alias   https://maplemoonbuild20260813.vercel.app
```

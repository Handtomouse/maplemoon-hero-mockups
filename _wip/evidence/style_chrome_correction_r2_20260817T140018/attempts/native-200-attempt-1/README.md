# Native-200 attempt 1

Outcome: **HARNESS ERROR — no browser/page assertions ran.**

The pinned accepted native-audit module was loaded with `importlib`, but the
wrapper did not register the module in `sys.modules` before execution. Python
3.14's `dataclasses` annotation lookup therefore raised `AttributeError` while
importing the accepted module. The R2 wrapper was corrected to register only
that pinned module before `exec_module`; no assertion or threshold changed.

Literal terminal exception begins:

```text
AttributeError: 'NoneType' object has no attribute '__dict__'. Did you mean: '__dir__'?
```

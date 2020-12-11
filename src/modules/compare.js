export const compare = (a, b, key, desc=false) => {
  const _a = a[key]
  const _b = b[key]
  if (_a !== _a && _b !== _b) return 0;
  if (_a !== _a) return 1;
  if (_b !== _b) return -1;

  if (_a == null && _b == null) return 0;
  if (_a == null) return 1;
  if (_b == null) return -1;

  if (_a === '' && _b === '') return 0;
  if (_a === '') return 1;
  if (_b === '') return -1;

  const sig = desc ? 1 : -1;
  return _a < _b ? sig : (_a > _b ? -sig : 0);
}
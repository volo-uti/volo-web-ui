# hooks/use-controllable

## useControllable

State that works both controlled and uncontrolled.

With `value` undefined it keeps its own state; with `value` defined it follows it and only
reports changes through `onChange`.

## Examples

### useControllable

```tsx
const [checked, setChecked] = useControllable({ value, defaultValue: false, onChange: onCheckedChange })
```

## Types

### UseControllableOptions

Options of useControllable.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `T` | — | no | Controlled value; when defined the hook mirrors it and never keeps its own state. |
| `defaultValue` | `T` | — | yes | Initial value of the uncontrolled state. |
| `onChange` | `(value: T) => void` | — | no | Called with the next value on every `setValue`, controlled or not. |

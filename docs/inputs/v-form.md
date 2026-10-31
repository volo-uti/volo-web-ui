# VForm

Vertical form layout that stops the browser's default submit navigation.

`onSubmit` runs after `preventDefault()`, so handle the submit in JavaScript.
Compose it with VFormField, VTextField and VButton.

## Examples

### VForm

```tsx
<VForm onSubmit={() => save(values)}>
  <VTextField label="Name" value={values.name} onValueChange={setName} />
  <VButton type="submit">Save</VButton>
</VForm>
```

## Props

### VFormProps

VForm props.

Every native `<form>` attribute (`action`, `noValidate`, `onChange`, `onReset`, …) passes
through to the form element.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `spacing` | `number \| string` | `'var(--v-spacing-lg)'` | no | Gap between children; a number is read as px. Defaults to the theme's large spacing. |

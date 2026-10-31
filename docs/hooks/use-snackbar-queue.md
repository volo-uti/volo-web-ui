# hooks/use-snackbar-queue

## useSnackbarQueue

Queues snackbars and exposes the current one.

`show` enqueues; `dismiss` moves on to the next; `clear` empties the queue.

## Examples

### useSnackbarQueue

```tsx
const { current, show, dismiss, clear } = useSnackbarQueue()

show({ content: 'First' })
show({ content: 'Second' }) // queued, shown after first

// Pass current to VSnackbar
{current && <VSnackbar visible {...current} onClose={dismiss} />}
```

## Types

### SnackbarQueueItem

One snackbar waiting in a `useSnackbarQueue` queue; spread it onto VSnackbar.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | — | no | Unique key; generated when omitted. |
| `variant` | `VSnackbarVariant` | — | no | Colour and icon of the snackbar. |
| `content` | `ReactNode` | — | yes | The message. |
| `action` | `{ label: string; onClick: () => void }` | — | no | Action button shown after the message. |
| `duration` | `number` | `5000` | no | Milliseconds before the snackbar is dismissed. |

# Component Copier React

```bash
bun install
```

```bash
bun run dev
```

```bash
bun run build
```

```bash
bun run lint
```

```bash
bun run format
```

## What the script does

- creates a red border highlight for elements when hovered.
- on click of element
  - turns the html into jsx components
    - keeps most attributes on the html, removes everything in ignoredHtmlAttributes as we know we dont want these
  - creates a styled component for each element
    - gets the page css and finds the relevant css rules for the element
    - transforms the css rules into a string
      - replaces css variables with their values
      - gets the pseudo selectors and transforms them to css (hover etc)
      - cleans up the css (zero width borders, etc)
    - creates a styled component with the relevant css
  - templates the whole component into a react component with styled components
  - copies the component to the clipboard

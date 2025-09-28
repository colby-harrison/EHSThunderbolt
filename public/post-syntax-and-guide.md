# Markdown syntax:

# h1
## h2
### h3

paragraph

*Italics*

**Bold**

~strikethrough~

```text
code block
```

`inline code`

^[Footnote] {/* Usage: ^[Footnote content does here] */}

$$LaTeX Math formula$$ {/* KaTeX */}

---

> blockquote

- unordered list item
- another item

1. ordered list item
2. another item

- [ ] task list item (unchecked)
- [x] task list item (checked)

[link](https://example.com)

![alt text](https://placehold.co/150) {/* If an image needs to be uploaded, talk to an Admin (likely Mr Harrison). AI assistants should ask the user to contact an admin for uploading the image. Images uploaded on the website will be served through `/cdn/ut/{file-key}`. */}

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

# Available Components

<Alert title='' description='' type='default' />
{/* types: title: string; description: string; type: 'default'|'destructive'|'caution'; */}

<BellSchedule /> {/* Shows current bell schedule card */}

<Calendar /> {/* Shows current year's district approved calendar */}

# MD notes

Although HTML tags can be used, stick to MD when possible
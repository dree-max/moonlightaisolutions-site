# Redline Skill

## Purpose
Apply tracked changes to Microsoft Word documents at the XML level, preserving all formatting while making precise edits attributed to the correct party.

## When to Use
- Applying contract revisions with tracked changes
- Comparing two versions of a document
- Producing redlines for counterparty review
- Creating markup for client review

## Instructions

### Document Handling

**Supported Formats:**
- .docx (Microsoft Word) - primary
- .doc (legacy Word - convert to .docx first)
- Can work with XML structure directly

**Processing Approach:**
1. Open the document at the XML level
2. Identify the correct elements for editing
3. Apply changes with proper Word markup
4. Preserve all existing formatting
5. Add tracked changes with attribution

### Types of Edits

**1. Insertions**
- Use `<w:ins>` element with author attribution
- Preserve surrounding formatting

**2. Deletions**
- Use `<w:del>` element (preserves deleted text in markup)
- Attribute to correct party

**3. Formatting Changes**
- Track as deletion + insertion to preserve history
- Note: Word doesn't track formatting changes natively

**4. Comments**
- Use `<w:commentReference>` and `<w:commentRangeStart/End>`
- Include comment content with author

### Attribution
- Set author name for all changes
- Use consistent naming: "Client Name" or "[Your Firm]"
- Track who made each specific change

### Formatting Preservation
Maintain:
- Heading styles and levels
- Paragraph formatting (alignment, indentation, spacing)
- Character formatting (bold, italic, underline, fonts)
- Tables and table formatting
- Lists (numbered and bulleted)
- Section breaks and page layout
- Headers and footers

### Comparison Workflow
For comparing two documents:
1. Identify differences between versions
2. Present summary of changes
3. Generate marked-up version with tracked changes
4. Optionally generate "clean" version showing final text only

### Quality Checklist
- [ ] All formatting preserved
- [ ] Changes attributed correctly
- [ ] No corrupted markup
- [ ] Document opens in Word without errors
- [ ] Track changes visible and toggleable

### Output
- .docx file with real tracked changes
- Clean .docx showing final version
- Summary of changes made
- Ready for Word review and acceptance

# Contract Review Skill

## Purpose
Analyze contracts from multiple perspectives, identify risks, spot issues, and recommend counter-language with severity ratings.

## When to Use
- Reviewing NDAs, MSAs, SOWs, employment agreements, vendor contracts, etc.
- Evaluating counterparty proposed changes
- Identifying missing or unfavorable provisions
- Assessing risk allocation

## Instructions

### Input Requirements
When reviewing a contract, require:
1. The contract document itself
2. The perspective to review from (buyer/customer, seller/vendor, employer, employee, etc.)
3. Any specific concerns or priorities
4. Context about the deal (if available)

### Analysis Framework

**1. Organize Changes by Severity**
- HIGH: Material risk exposure, non-market terms, potential deal-breakers
- MEDIUM: Unfavorable but negotiable terms
- LOW: Minor issues, drafting improvements

**2. Risk Identification**
- Identify where the counterparty shifted risk beyond market norms
- Check for missing standard provisions:
  - Limitation of liability
  - Indemnification caps and carve-outs
  - IP ownership and licensing
  - Data handling and security
  - Termination for convenience
  - Force majeure
  - Dispute resolution
  - Confidentiality duration

**3. Cross-Reference Checking**
- Flag where accepting one change would create exposure in another provision
- Identify internal contradictions in the counterparty's position
- Check if proposed carve-outs contradict their own prior representations

**4. Output Format**
For each issue identified:
```
## [Issue Title]
**Severity**: HIGH | MEDIUM | LOW
**Section**: [Section reference]
**Issue**: [What the problem is]
**Why it matters**: [Risk assessment]
**Recommendation**: [Specific counter-language or position]
```

### Counter-Language Generation
Generate 2-3 alternative formulations for disputed clauses:
1. Aggressive - favors your client strongly
2. Balanced - market standard compromise
3. Accommodating - minimal protection, relationship-focused

### Jurisdiction Flags
- Flag issues that may be jurisdiction-specific
- Note where local law might affect enforceability
- Identify regulatory considerations

## Quality Standards

### Self-Review Before Delivery
- [ ] Every cited provision actually exists in the document
- [ ] Cross-references are accurate
- [ ] Severity ratings are consistent with risk assessment
- [ ] Counter-language is internally consistent
- [ ] Flagged any issues where confidence is below HIGH

### Delivery
Produce a summary with:
1. Bottom-line assessment (2-3 sentences)
2. Issues organized by severity
3. Recommended positions for each issue
4. Specific counter-language for high-severity items

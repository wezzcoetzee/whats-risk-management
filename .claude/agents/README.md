# Agents Directory

This directory contains specialized agent configurations for different aspects of the budget application development.

## Available Agents

### Sebastian - Critical Code Reviewer Agent (`sebastian-code-reviewer.md`)

Specialized in comprehensive code reviews with focus on:

- Bug detection and prevention (logic errors, edge cases, state issues)
- Security vulnerability assessment (XSS, injection, auth flaws)
- Code quality enforcement (SOLID, DRY, KISS, YAGNI principles)
- Performance issue identification (memory leaks, inefficient algorithms)
- Maintainability and testability analysis
- TypeScript and React-specific issue detection

### Principal Engineer Agent (`principal-engineer.md`)

Conducts architectural reviews and high-level code analysis including:

- Architectural patterns and SOLID principles
- Performance optimization strategies
- Security best practices
- Scalability and maintainability assessment
- Technology stack guidance

### QA Engineer Agent (`qa-engineer.md`)

Manages comprehensive testing strategy and quality assurance:

- Test coverage and strategy development
- Unit, integration, and E2E testing patterns
- Quality metrics and coverage standards
- Testing framework and tooling guidance

### Test Architect Agent (`test-architect.md`)

Specializes in testing architecture and automation:

- Test infrastructure and CI/CD integration
- Advanced testing patterns and strategies
- Test automation frameworks
- Performance and load testing

### UX Specialist Agent (`ux-specialist.md`)

Handles all user experience and interface design decisions including:

- UI component styling and layout
- Accessibility and responsive design
- Visual design consistency
- User flow optimization
- Design system maintenance

### Documentation Specialist Agent (`documentation-specialist.md`)

Manages all documentation and knowledge management including:

- Feature documentation and specifications
- Technical architecture and decision documentation
- Business logic and requirements documentation
- API and code documentation
- Process and workflow documentation

## Usage

To consult an agent, use the Task tool with the agent's markdown file content as context:

```typescript
// Example: Consulting Sebastian for code review
Task({
  description: 'Code review with Sebastian',
  prompt: `${sebastianCodeReviewerPrompt}

Current request: Please review this React component for bugs, security issues, and code quality problems:

[Include the code to be reviewed]

Focus on potential state management issues, security vulnerabilities, and performance concerns.`,
})

// Example: Consulting the UX Specialist for styling decisions
Task({
  description: 'UX consultation',
  prompt: `${uxSpecialistPrompt}

Current request: I need to style a budget form with income/expense input fields. The form should be mobile-friendly and follow our design system.

Please provide specific Tailwind classes and component structure recommendations.`,
})
```

## Agent Integration Pattern

1. **Identify the Domain**: Determine which specialized agent should handle the request
2. **Load Agent Context**: Include the agent's prompt and guidelines
3. **Provide Specific Context**: Share relevant code, designs, or requirements
4. **Request Specific Output**: Ask for actionable recommendations in the agent's domain
5. **Apply Recommendations**: Implement the agent's suggestions

This pattern ensures domain expertise is applied consistently across the application while maintaining separation of concerns.

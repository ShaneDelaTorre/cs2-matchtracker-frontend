# Default task (runs if you just type 'just')
default: dev

# Start development server
dev:
    pnpm dev

# Build the project for production
build:
    pnpm build

# Run linting and type checking in parallel
check:
    pnpm lint
    pnpm exec tsc --noEmit

# Clean build artifacts and reinstall dependencies
reset:
    rm -rf .next node_modules
    pnpm install

# Run a specific script with arguments (e.g., 'just test --watch')
test *args:
    pnpm test {{args}}

# Formatter
format:
    pnpm exec prettier --write .

format-check:
    pnpm exec prettier --check .
#!/bin/bash

# MindfulConnect Deployment Script
# This script helps deploy the application to various platforms

set -e  # Exit on any error

echo "🚀 MindfulConnect Deployment Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_status "Node.js version: $(node -v)"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_status "npm version: $(npm -v)"
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    npm install
    npm install three @react-three/fiber @react-three/drei
    print_status "Dependencies installed successfully"
}

# Build the application
build_app() {
    print_info "Building the application..."
    npm run build
    print_status "Application built successfully"
}

# Export static files
export_static() {
    print_info "Exporting static files..."
    npm run export
    print_status "Static files exported successfully"
}

# Deploy to GitHub Pages
deploy_github_pages() {
    print_info "Deploying to GitHub Pages..."
    
    # Check if gh-pages is installed
    if ! npm list gh-pages &> /dev/null; then
        print_info "Installing gh-pages..."
        npm install --save-dev gh-pages
    fi
    
    # Deploy
    npm run deploy
    print_status "Deployed to GitHub Pages successfully"
    print_info "Your site will be available at: https://yourusername.github.io/mindful-connect"
}

# Setup Vercel deployment
setup_vercel() {
    print_info "Setting up Vercel deployment..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    print_info "Run 'vercel' to deploy to Vercel"
    print_info "Your site will be available at: https://mindful-connect.vercel.app"
}

# Setup Netlify deployment
setup_netlify() {
    print_info "Setting up Netlify deployment..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    print_info "Run 'netlify deploy --prod --dir=out' to deploy to Netlify"
}

# Create .env.local from example
setup_env() {
    if [ ! -f ".env.local" ]; then
        print_info "Creating .env.local from example..."
        cp .env.example .env.local
        print_warning "Please edit .env.local with your API keys (optional for demo mode)"
    else
        print_status ".env.local already exists"
    fi
}

# Run tests
run_tests() {
    print_info "Running basic checks..."
    
    # Check TypeScript
    if command -v tsc &> /dev/null; then
        npx tsc --noEmit
        print_status "TypeScript check passed"
    fi
    
    # Check linting
    npm run lint
    print_status "Linting check passed"
}

# Main deployment function
main() {
    echo ""
    print_info "Starting deployment process..."
    echo ""
    
    # Basic checks
    check_node
    check_npm
    
    # Setup environment
    setup_env
    
    # Install and build
    install_dependencies
    run_tests
    build_app
    export_static
    
    echo ""
    print_status "Build completed successfully!"
    echo ""
    
    # Deployment options
    echo "Choose deployment option:"
    echo "1) GitHub Pages"
    echo "2) Vercel"
    echo "3) Netlify"
    echo "4) All platforms"
    echo "5) Skip deployment"
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            deploy_github_pages
            ;;
        2)
            setup_vercel
            ;;
        3)
            setup_netlify
            ;;
        4)
            deploy_github_pages
            setup_vercel
            setup_netlify
            ;;
        5)
            print_info "Skipping deployment. Files are ready in 'out' directory."
            ;;
        *)
            print_warning "Invalid choice. Skipping deployment."
            ;;
    esac
    
    echo ""
    print_status "🎉 Deployment process completed!"
    echo ""
    print_info "Your MindfulConnect platform is ready to help people across India!"
    print_info "Demo features work without any API keys."
    print_info "For full functionality, add your API keys to .env.local"
    echo ""
}

# Help function
show_help() {
    echo "MindfulConnect Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [option]"
    echo ""
    echo "Options:"
    echo "  help          Show this help message"
    echo "  build         Build the application only"
    echo "  github        Deploy to GitHub Pages"
    echo "  vercel        Setup Vercel deployment"
    echo "  netlify       Setup Netlify deployment"
    echo "  all           Full deployment to all platforms"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh           # Interactive deployment"
    echo "  ./deploy.sh build     # Build only"
    echo "  ./deploy.sh github    # Deploy to GitHub Pages"
    echo ""
}

# Handle command line arguments
case "${1:-}" in
    "help"|"-h"|"--help")
        show_help
        ;;
    "build")
        check_node
        check_npm
        install_dependencies
        build_app
        export_static
        ;;
    "github")
        check_node
        check_npm
        install_dependencies
        build_app
        export_static
        deploy_github_pages
        ;;
    "vercel")
        setup_vercel
        ;;
    "netlify")
        setup_netlify
        ;;
    "all")
        main
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac

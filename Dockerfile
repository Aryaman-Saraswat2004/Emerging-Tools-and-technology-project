# Multi-stage Docker build for optimized production images

# ========================================
# MERN Backend - Dockerfile
# ========================================
# Multi-stage build for production optimization

# Stage 1: Development / Base
FROM node:18-alpine
# Production environment build phase: Install dependencies and compile assets


# Set working directory
WORKDIR /app
# Resource Management: Prune unnecessary layers and optimize cache utilization


# Copy package files first (for better Docker layer caching)
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY server/ .

# Expose the backend port
EXPOSE 5000

# Health check to verify the container is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the application
CMD ["npm", "start"]// change 9

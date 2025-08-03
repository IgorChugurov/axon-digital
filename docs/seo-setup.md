# SEO Setup Documentation

## Overview

This document describes the SEO setup for the AxonDigital website, including robots.txt, sitemap.xml, and dynamic sitemap generation.

## Files Created

### 1. robots.txt

**Location**: `public/robots.txt`

**Purpose**: Instructs search engine crawlers on how to index the website.

**Key Features**:

- Allows crawling of all public pages
- Blocks API routes (`/api/`)
- Blocks Next.js internal routes (`/_next/`)
- References sitemap location
- Sets crawl delay for respectful crawling

### 2. Static sitemap.xml

**Location**: `public/sitemap.xml`

**Purpose**: Static XML sitemap for search engines.

**Content**:

- All main pages (home, about, services, solutions, etc.)
- All service pages (web-app-development, ai-integration, etc.)
- All solution pages (oblikflow-en, education-platform, etc.)
- All expertise pages (fintech-financial, healthcare-medtech, etc.)

### 3. Dynamic sitemap.ts

**Location**: `src/app/sitemap.ts`

**Purpose**: Next.js dynamic sitemap generation that automatically updates.

**Features**:

- Automatically generates current date for lastModified
- Includes all static and dynamic routes
- Proper priority and change frequency settings
- TypeScript support with MetadataRoute.Sitemap

## URL Structure

### Main Pages

- `/` - Homepage (priority: 1.0, weekly updates)
- `/about` - About page (priority: 0.8, monthly updates)
- `/services` - Services overview (priority: 0.9, monthly updates)
- `/solutions` - Solutions overview (priority: 0.9, monthly updates)
- `/expertise` - Expertise overview (priority: 0.8, monthly updates)
- `/platform` - Platform page (priority: 0.8, monthly updates)
- `/contact` - Contact page (priority: 0.7, monthly updates)
- `/public-offer` - Public offer (priority: 0.3, yearly updates)

### Service Pages

- `/services/web-app-development`
- `/services/website-creation`
- `/services/ai-integration`
- `/services/process-automation`
- `/services/tvorflow-platform`
- `/services/spec-documentation`
- `/services/documentation-audit`

### Solution Pages

- `/solutions/oblikflow-en`
- `/solutions/oblikflow-ua`
- `/solutions/education-platform`
- `/solutions/healthcare-systems`
- `/solutions/ecommerce-platforms`
- `/solutions/realestate-platform`
- `/solutions/fintech-platform`
- `/solutions/enterprise-process-automation`
- `/solutions/ai-integration`

### Expertise Pages

- `/expertise/fintech-financial`
- `/expertise/healthcare-medtech`
- `/expertise/ecommerce-retail`
- `/expertise/enterprise-corporate`
- `/expertise/education-edtech`
- `/expertise/proptech-realestate`

## Priority Settings

- **1.0**: Homepage (highest priority)
- **0.9**: Main service/solution overview pages
- **0.8**: Individual service/solution pages and main content pages
- **0.7**: Expertise pages and contact
- **0.3**: Legal pages (public offer)

## Change Frequency

- **weekly**: Homepage (frequently updated)
- **monthly**: Most content pages (regular updates)
- **yearly**: Legal pages (rarely updated)

## Maintenance

### Updating sitemap.ts

When adding new pages:

1. Add the new slug to the appropriate array in `sitemap.ts`
2. The dynamic sitemap will automatically include the new page
3. No need to manually update the static XML file

### Testing

- Verify robots.txt: Visit `https://axondigital.xyz/robots.txt`
- Verify sitemap: Visit `https://axondigital.xyz/sitemap.xml`
- Test in Google Search Console
- Validate sitemap format using online validators

## Search Engine Submission

1. **Google Search Console**:

   - Submit sitemap URL: `https://axondigital.xyz/sitemap.xml`
   - Monitor indexing status

2. **Bing Webmaster Tools**:

   - Submit sitemap URL: `https://axondigital.xyz/sitemap.xml`
   - Monitor indexing status

3. **Other Search Engines**:
   - Yandex Webmaster
   - Baidu Webmaster Tools

## Best Practices

- ✅ Sitemap is automatically generated and updated
- ✅ Proper priority settings for different page types
- ✅ Appropriate change frequency settings
- ✅ Robots.txt blocks sensitive areas
- ✅ All important pages included
- ✅ XML format is valid
- ✅ Includes lastModified dates

## Monitoring

Regular checks:

- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] All new pages are included in sitemap
- [ ] Search engine indexing status in webmaster tools
- [ ] No broken links in sitemap

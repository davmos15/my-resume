#!/usr/bin/env node

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const dbPath = path.join(__dirname, '../database/portfolio.db');
const db = new Database(dbPath);

// Content directories
const projectsDir = path.join(__dirname, '../src/content/projects');
const resumeDir = path.join(__dirname, '../src/content/resume');

// Ensure directories exist
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}
if (!fs.existsSync(resumeDir)) {
    fs.mkdirSync(resumeDir, { recursive: true });
}

// Migrate Projects
console.log('🚀 Migrating projects...');
try {
    const projects = db.prepare('SELECT * FROM projects WHERE is_active = true ORDER BY display_order, id DESC').all();
    
    projects.forEach((project, index) => {
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const filename = `${slug}.md`;
        
        const frontmatter = {
            title: project.title,
            emoji: project.emoji || '🚀',
            subtitle: project.subtitle || '',
            description: project.description || '',
            technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
            github: project.github_link || '',
            live: project.live_link || '',
            featured: index < 2, // First two projects are featured
            order: project.display_order || index + 1
        };
        
        const content = `---
title: "${frontmatter.title}"
emoji: "${frontmatter.emoji}"
subtitle: "${frontmatter.subtitle}"
description: "${frontmatter.description}"
technologies: ${JSON.stringify(frontmatter.technologies)}
github: "${frontmatter.github}"
live: "${frontmatter.live}"
featured: ${frontmatter.featured}
order: ${frontmatter.order}
---

## Overview

${frontmatter.description}

## Key Features

- Add your key features here
- Feature 2
- Feature 3

## Technical Details

Add technical implementation details here.

## Results

Add project results and impact here.
`;
        
        fs.writeFileSync(path.join(projectsDir, filename), content);
        console.log(`  ✅ Created ${filename}`);
    });
} catch (error) {
    console.error('Error migrating projects:', error);
}

// Migrate Resume Sections
console.log('\n📄 Migrating resume sections...');
try {
    const resumeSections = db.prepare('SELECT * FROM resume_sections WHERE is_active = true ORDER BY section_type, display_order').all();
    
    // Group by section type
    const grouped = resumeSections.reduce((acc, section) => {
        if (!acc[section.section_type]) {
            acc[section.section_type] = [];
        }
        acc[section.section_type].push({
            id: section.id,
            title: section.title,
            subtitle: section.subtitle,
            date_range: section.date_range,
            description: section.description,
            details: section.details,
            order: section.display_order
        });
        return acc;
    }, {});
    
    // Save each section type as a JSON file
    Object.entries(grouped).forEach(([type, items]) => {
        const filename = `${type}.json`;
        fs.writeFileSync(
            path.join(resumeDir, filename),
            JSON.stringify(items, null, 2)
        );
        console.log(`  ✅ Created ${filename} with ${items.length} items`);
    });
    
    // Create a combined resume data file
    const resumeData = {
        experience: grouped.experience || [],
        skills: grouped.skills || [],
        education: grouped.education || [],
        certifications: grouped.certifications || []
    };
    
    fs.writeFileSync(
        path.join(resumeDir, 'resume-data.json'),
        JSON.stringify(resumeData, null, 2)
    );
    console.log('  ✅ Created resume-data.json');
    
} catch (error) {
    console.error('Error migrating resume sections:', error);
}

// Create example content configuration
const contentConfig = `import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emoji: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string(),
    technologies: z.array(z.string()).optional(),
    github: z.string().optional(),
    live: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = {
  projects: projectsCollection,
};
`;

const configPath = path.join(__dirname, '../src/content/config.ts');
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, contentConfig);
    console.log('\n✅ Created content configuration file');
}

console.log('\n🎉 Migration complete!');
console.log('\nNext steps:');
console.log('1. Review the generated markdown files in src/content/projects/');
console.log('2. Review the JSON files in src/content/resume/');
console.log('3. Update your pages to use the new content sources');
console.log('4. Consider removing the database dependency once everything works');

db.close();
'use strict';

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    // 1. Enable public read-only access for custom APIs
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        const actions = [
          'api::category.category.find',
          'api::category.category.findOne',
          'api::author.author.find',
          'api::author.author.findOne',
          'api::post.post.find',
          'api::post.post.findOne'
        ];

        for (const action of actions) {
          const permissionExists = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id }
          });
          if (!permissionExists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id }
            });
          }
        }
      }
    } catch (err) {
      strapi.log.error('Error during public permissions set: ', err);
    }

    // 2. Seed mock data if database has no categories
    try {
      const categoryCount = await strapi.query('api::category.category').count();
      if (categoryCount === 0) {
        const categories = {
          design: (await strapi.query('api::category.category').create({ data: { name: 'Design', slug: 'design' } })).id,
          development: (await strapi.query('api::category.category').create({ data: { name: 'Development', slug: 'development' } })).id,
          lifestyle: (await strapi.query('api::category.category').create({ data: { name: 'Lifestyle', slug: 'lifestyle' } })).id,
          productivity: (await strapi.query('api::category.category').create({ data: { name: 'Productivity', slug: 'productivity' } })).id,
          travel: (await strapi.query('api::category.category').create({ data: { name: 'Travel', slug: 'travel' } })).id
        };

        const authors = {
          sarah: (await strapi.query('api::author.author').create({
            data: { name: 'Sarah Johnson', avatarUrl: '/images/avatars/sarah-avatar.png' }
          })).id,
          alex: (await strapi.query('api::author.author').create({
            data: { name: 'Alex Morgan', avatarUrl: '/images/avatars/alex-avatar.png' }
          })).id,
          maya: (await strapi.query('api::author.author').create({
            data: { name: 'Maya Patel', avatarUrl: '/images/avatars/maya-avatar.png' }
          })).id,
          james: (await strapi.query('api::author.author').create({
            data: { name: 'James Lee', avatarUrl: '/images/avatars/james-avatar.png' }
          })).id
        };

        await strapi.query('api::post.post').create({
          data: {
            title: 'The Power of Minimal Design',
            slug: 'the-power-of-minimal-design',
            content: `Minimal design is more than a visual style — it's a mindset. It's about stripping away the unnecessary so what truly matters can shine.

When we embrace minimalism in design, we create experiences that are cleaner, faster, and more meaningful. Every element has a purpose.

## Why Minimal Design Works
It reduces clutter, improves focus, and helps users connect with content more intuitively. In a world full of noise, simplicity is a breath of fresh air.

> Simplicity is the ultimate sophistication.
> — Leonardo da Vinci

## Practical Tips
- Use whitespace intentionally.
- Limit your color palette.
- Choose typography that communicates clearly.
- Remove anything that doesn't add value.

Minimalism isn't about doing less for the sake of it. It's about making space for what really matters.`,
            snippet: "Minimalism isn't about having less, it's about making room for what matters most.",
            readTime: '5 min read',
            publishedDate: '2026-05-12',
            imageUrl: '/images/posts/post-minimal.png',
            category: categories.design,
            author: authors.sarah
          }
        });

        await strapi.query('api::post.post').create({
          data: {
            title: 'Build Better with Clean Code',
            slug: 'build-better-with-clean-code',
            content: `Writing clean code is like writing a good book. It should be easy to read, simple to understand, and pleasant to maintain.

## The Core Principles
- **SRP (Single Responsibility Principle)**: A function or module should do one thing and do it well.
- **DRY (Don't Repeat Yourself)**: Avoid duplicating logic.
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering.

> Clean code always looks like it was written by someone who cares.
> — Michael Feathers

## Refactoring Tips
1. Name variables descriptively.
2. Keep functions under 20 lines.
3. Write comprehensive unit tests.`,
            snippet: 'Writing clean code is an art that pays off every time you scale...',
            readTime: '8 min read',
            publishedDate: '2026-05-10',
            imageUrl: '/images/posts/post-code.png',
            category: categories.development,
            author: authors.alex
          }
        });

        await strapi.query('api::post.post').create({
          data: {
            title: 'Finding Balance in a Busy World',
            slug: 'finding-balance-in-a-busy-world',
            content: `In a hyper-connected world, finding quiet moments is essential for mental health and creativity.

## Daily Rituals for Balance
- **Digital Detox**: Turn off notifications for at least 1 hour daily.
- **Nature Walks**: Reconnect with the natural environment.
- **Mindfulness**: Spend 5 minutes meditating every morning.

> Guard your time as your most precious resource.`,
            snippet: 'Simple habits that help you stay grounded and productive...',
            readTime: '6 min read',
            publishedDate: '2026-05-08',
            imageUrl: '/images/posts/post-balance.png',
            category: categories.lifestyle,
            author: authors.maya
          }
        });

        await strapi.query('api::post.post').create({
          data: {
            title: 'Typography Tips for the Web',
            slug: 'typography-tips-for-the-web',
            content: `Typography is the voice of your text. It communicates personality before the reader even processes the words.

## Rules of Web Typography
- **Hierarchy**: Use size and weight contrast to guide the eyes.
- **Line Height**: Maintain 1.5x font size for comfortable reading.
- **Limit Fonts**: Stick to 2 fonts maximum on a project.

> Typography is a beautiful group of letters, not a group of beautiful letters.
> — Matthew Carter`,
            snippet: 'Good typography can elevate your design and improve readability.',
            readTime: '4 min read',
            publishedDate: '2026-04-28',
            imageUrl: '/images/posts/post-typography.png',
            category: categories.design,
            author: authors.james
          }
        });

        await strapi.query('api::post.post').create({
          data: {
            title: 'Focus More, Do Less',
            slug: 'focus-more-do-less',
            content: `Productivity is not about doing more. It's about doing the right things with deep focus.

## The Focus Method
- **Batching**: Group similar tasks together.
- **Time Blocking**: Dedicate specific hours to deep work.
- **No Meetings**: Protect morning blocks for execution.`,
            snippet: 'Discover how to eliminate distractions and double your output...',
            readTime: '7 min read',
            publishedDate: '2026-05-02',
            imageUrl: '/images/posts/post-focus.png',
            category: categories.productivity,
            author: authors.alex
          }
        });

        await strapi.query('api::post.post').create({
          data: {
            title: 'Wander Often, Wonder Always',
            slug: 'wander-often-wonder-always',
            content: `Travel stretches our minds and fills our hearts with stories. It reminds us of how vast and beautiful our world is.`,
            snippet: 'Journey through off-beaten paths and rediscover the world...',
            readTime: '9 min read',
            publishedDate: '2026-05-01',
            imageUrl: '/images/posts/post-wander.png',
            category: categories.travel,
            author: authors.sarah
          }
        });
      }
    } catch (err) {
      strapi.log.error('Error during data seeding: ', err);
    }
  },
};

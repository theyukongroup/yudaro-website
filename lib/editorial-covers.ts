export type EditorialVisual = {
  category: string;
  headline: readonly [string, string];
  tone: 'pilot' | 'migration' | 'inventory';
};

const visuals: Record<string, EditorialVisual> = {
  '/resources/blog': {
    category: 'Yudaro Journal',
    headline: ['Ideas into', 'practice.'],
    tone: 'pilot',
  },
  '/resources/architecture': {
    category: 'Architecture library',
    headline: ['Design before', 'deployment.'],
    tone: 'inventory',
  },
  '/resources/private-ai-sop-pilot': {
    category: 'Private AI',
    headline: ['Test before', 'you trust.'],
    tone: 'pilot',
  },
  '/resources/odoo-data-migration-checklist': {
    category: 'Odoo ERP',
    headline: ['Clean data.', 'Clear start.'],
    tone: 'migration',
  },
  '/resources/ai-odoo-inventory-answers': {
    category: 'AI + ERP',
    headline: ['In stock?', 'Show the source.'],
    tone: 'inventory',
  },
  '/resources/odoo-implementation-planning': {
    category: 'Odoo ERP',
    headline: ['Plan before', 'the rollout.'],
    tone: 'migration',
  },
  '/resources/private-ai-security': {
    category: 'Private AI',
    headline: ['Map access.', 'Test boundaries.'],
    tone: 'pilot',
  },
  '/resources/faqs': {
    category: 'Common questions',
    headline: ['Questions before', 'you start.'],
    tone: 'pilot',
  },
  '/resources/ai-erp': {
    category: 'AI + ERP',
    headline: ['Knowledge meets', 'operations.'],
    tone: 'inventory',
  },
  '/resources/architecture/private-ai-odoo': {
    category: 'Reference design',
    headline: ['Identity. Evidence.', 'Execution.'],
    tone: 'inventory',
  },
  '/resources/private-ai': {
    category: 'Private AI',
    headline: ['Your knowledge.', 'Clear access.'],
    tone: 'pilot',
  },
  '/resources/odoo-erp': {
    category: 'Odoo ERP',
    headline: ['Shared records.', 'Connected work.'],
    tone: 'migration',
  },
  '/resources/business-automation': {
    category: 'Automation',
    headline: ['Start with', 'one workflow.'],
    tone: 'inventory',
  },
  '/resources/comparisons': {
    category: 'Buyer guide',
    headline: ['Different tools.', 'Different roles.'],
    tone: 'migration',
  },
  '/resources/guides': {
    category: 'Planning guide',
    headline: ['Scope, cost', '& timing.'],
    tone: 'migration',
  },
  '/resources/industries/wholesale-distribution': {
    category: 'Industry guide',
    headline: ['Stock, orders', '& fulfillment.'],
    tone: 'inventory',
  },
  '/resources/industries/hvac-field-service': {
    category: 'Industry guide',
    headline: ['Dispatch, parts', '& service.'],
    tone: 'inventory',
  },
  '/resources/industries/construction': {
    category: 'Industry guide',
    headline: ['Projects, costs', '& approvals.'],
    tone: 'inventory',
  },
  '/resources/industries/manufacturing': {
    category: 'Industry guide',
    headline: ['Materials, work', '& quality.'],
    tone: 'inventory',
  },
  '/resources/industries/retail': {
    category: 'Industry guide',
    headline: ['Products, stores', '& inventory.'],
    tone: 'inventory',
  },
  '/resources/industries/professional-services': {
    category: 'Industry guide',
    headline: ['Projects, time', '& delivery.'],
    tone: 'inventory',
  },
  '/resources/industries/restaurants': {
    category: 'Industry guide',
    headline: ['Purchasing, stock', '& reporting.'],
    tone: 'inventory',
  },
};

export function resourceVisual(
  path: string,
  category = 'Practical guide',
): EditorialVisual {
  return (
    visuals[path] ?? {
      category,
      headline: ['Practical ideas.', 'Smarter work.'],
      tone: 'pilot',
    }
  );
}

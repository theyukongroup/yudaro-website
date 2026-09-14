import type { AssessmentAnswers, Scores } from '@/lib/member-tools';

export type RestaurantType = 'makeToOrder' | 'chineseBuffet' | 'hybrid';
export type RestaurantCategory =
  | 'foodCost' | 'purchasing' | 'inventory' | 'operations' | 'waste'
  | 'labor' | 'pos' | 'customer' | 'reporting' | 'training' | 'accounting' | 'ai';

export type RestaurantQuestion = {
  id: string;
  category: RestaurantCategory;
  label: string;
  help?: string;
  models?: RestaurantType[];
  reverse?: boolean;
};

export const restaurantProfileFields = [
  { id: 'restaurantType', label: 'Restaurant type', options: [['makeToOrder','Make-to-Order'],['chineseBuffet','Chinese Buffet'],['hybrid','Hybrid / Both']] },
  { id: 'restaurantLocations', label: 'Number of locations', options: [['1','1'],['2–5','2–5'],['6–20','6–20'],['20+','20+']] },
  { id: 'monthlyRevenue', label: 'Monthly revenue', options: [['under-50k','Under $50,000'],['50k-100k','$50,000–$100,000'],['100k-250k','$100,000–$250,000'],['250k-500k','$250,000–$500,000'],['500k+','$500,000+']] },
  { id: 'restaurantEmployees', label: 'Number of employees', options: [['under-10','Under 10'],['10-25','10–25'],['26-50','26–50'],['50+','50+']] },
  { id: 'currentPos', label: 'Current POS', options: ['Toast','Square','Clover','SpotOn','Lightspeed','Other','None'].map(x=>[x,x]) },
  { id: 'accountingSystem', label: 'Accounting system', options: ['QuickBooks','Xero','Odoo','Spreadsheet','Accountant only','Other'].map(x=>[x,x]) },
  { id: 'inventorySystem', label: 'Inventory system', options: ['Dedicated inventory software','POS inventory','Spreadsheet','Manual / paper','No formal system'].map(x=>[x,x]) },
] as const;

export const orderingChannels = ['Dine-in','Takeout','Own website','DoorDash','Uber Eats','Grubhub','Phone orders','Other'];

export const categoryLabels: Record<RestaurantCategory,string> = {
  foodCost:'Food Cost & Recipe Control', purchasing:'Purchasing & Vendor Management', inventory:'Food & Ingredient Inventory',
  operations:'Kitchen & Service Operations', waste:'Waste & Shrinkage', labor:'Labor & Scheduling', pos:'POS & Order Integration',
  customer:'Customer & Marketing', reporting:'Management Reporting', training:'Employee Training & SOP',
  accounting:'Accounting & Financial Integration', ai:'AI & Automation Readiness',
};

const q = (id:string, category:RestaurantCategory, label:string, models?:RestaurantType[], reverse=false):RestaurantQuestion => ({id,category,label,models,reverse});
export const restaurantQuestions: RestaurantQuestion[] = [
  q('recipeCost','foodCost','Do you know the current ingredient cost of every menu item?',['makeToOrder','hybrid']),
  q('recipeStandard','foodCost','Are recipes and portion quantities standardized?',['makeToOrder','hybrid']),
  q('menuMargin','foodCost','Can management identify the highest- and lowest-margin menu items?',['makeToOrder','hybrid']),
  q('buffetFoodCost','foodCost','Can management calculate food cost per buffet customer by service period?',['chineseBuffet','hybrid']),
  q('vendorCompare','purchasing','Are purchase prices compared across qualified vendors?'),
  q('vendorIncrease','purchasing','Can management identify ingredient price increases promptly?'),
  q('purchaseHistory','purchasing','Do you maintain ingredient and vendor purchasing history?'),
  q('inventoryFrequency','inventory','Is food inventory counted on a consistent schedule?'),
  q('estimatedInventory','inventory','Can inventory be estimated from purchases, recipes, and sales?'),
  q('storageInventory','inventory','Do you track cooler, freezer, and dry-storage inventory?'),
  q('ticketRouting','operations','Are orders routed from the POS to the correct kitchen station?',['makeToOrder','hybrid']),
  q('ticketTime','operations','Can management measure ticket preparation time and peak bottlenecks?',['makeToOrder','hybrid']),
  q('batchForecast','operations','Are buffet batch quantities based on demand by day and service period?',['chineseBuffet','hybrid']),
  q('replenishment','operations','Can staff anticipate which buffet trays need replenishment next?',['chineseBuffet','hybrid']),
  q('wasteMeasured','waste','Is discarded food measured consistently and valued in dollars?'),
  q('overproduction','waste','Can management identify recurring overproduction or unusual usage?'),
  q('lateFullTrays','waste','Do you avoid preparing full trays near the end of buffet service?',['chineseBuffet','hybrid']),
  q('laborSchedule','labor','Are labor schedules informed by expected customer demand?'),
  q('productivity','labor','Can management compare labor productivity by shift or service period?'),
  q('orderIntegration','pos','Are online and delivery orders integrated without manual re-entry?'),
  q('channelProfit','pos','Can you compare profitability across dine-in, takeout, direct, and delivery channels?'),
  q('menuSync','pos','Are menu items and prices synchronized across ordering channels?',['makeToOrder','hybrid']),
  q('retention','customer','Can you identify and follow up with valuable or inactive customers?'),
  q('promotionResults','customer','Can management measure promotion results beyond total sales?'),
  q('dailyView','reporting','Can owners see sales, food cost, labor, waste, and cash information promptly?'),
  q('periodCompare','reporting','Can management compare shifts, locations, weekdays, and service periods?'),
  q('trainingDocs','training','Are recipes, opening, closing, service, and food-safety procedures documented?'),
  q('searchableSops','training','Can employees quickly find the current approved procedure?'),
  q('managerDependency','training','Can new employees learn routine procedures without repeatedly interrupting a manager?'),
  q('accountingIntegration','accounting','Do POS, purchasing, payroll, and expenses reach accounting without repeated entry?'),
  q('locationFinancials','accounting','Can management review timely profit and loss information by location?'),
  q('forecastData','ai','Do you retain clean historical sales, customer-count, purchasing, and waste data for forecasting?'),
  q('aiGovernance','ai','Could a private AI assistant use approved restaurant documents with controlled access?'),
  q('anomalyAlerts','ai','Would your current data support alerts for unusual food cost, waste, or vendor pricing?'),
];

const makeWeights:Record<RestaurantCategory,number>={foodCost:15,purchasing:10,inventory:10,operations:10,waste:8,labor:8,pos:10,customer:5,reporting:8,training:6,accounting:5,ai:5};
const buffetWeights:Record<RestaurantCategory,number>={foodCost:12,purchasing:10,inventory:10,operations:12,waste:15,labor:7,pos:7,customer:0,reporting:8,training:5,accounting:5,ai:9};

export function questionsFor(type:RestaurantType){return restaurantQuestions.filter(question=>!question.models||question.models.includes(type));}
const numeric=(answers:AssessmentAnswers,id:string)=>Math.max(0,Math.min(3,Number(answers[id]??0)));
export type RestaurantScores = Scores & {restaurant:true; restaurantType:RestaurantType; categories:Record<RestaurantCategory,number>; status:string};
export function scoreRestaurantAssessment(answers:AssessmentAnswers):RestaurantScores{
  const type=(answers.restaurantType||'makeToOrder') as RestaurantType;
  const questions=questionsFor(type);
  const categories=Object.fromEntries((Object.keys(categoryLabels) as RestaurantCategory[]).map(category=>{
    const entries=questions.filter(question=>question.category===category);
    const score=entries.length?Math.round(entries.reduce((sum,item)=>sum+numeric(answers,item.id),0)/(entries.length*3)*100):100;
    return [category,score];
  })) as Record<RestaurantCategory,number>;
  const weights=type==='chineseBuffet'?buffetWeights:type==='makeToOrder'?makeWeights:Object.fromEntries((Object.keys(makeWeights) as RestaurantCategory[]).map(key=>[key,(makeWeights[key]+buffetWeights[key])/2])) as Record<RestaurantCategory,number>;
  const totalWeight=Object.values(weights).reduce((a,b)=>a+b,0);
  const overall=Math.round((Object.keys(weights) as RestaurantCategory[]).reduce((sum,key)=>sum+categories[key]*weights[key],0)/totalWeight);
  const status=overall<40?'Critical Operational Gaps':overall<60?'High Automation Opportunity':overall<80?'Growth Ready':'Digitally Advanced';
  return {restaurant:true,restaurantType:type,categories,status,overall,ai:categories.ai,erp:Math.round((categories.purchasing+categories.inventory+categories.accounting+categories.reporting)/4),automation:Math.round((categories.operations+categories.waste+categories.labor+categories.pos)/4),data:Math.round((categories.inventory+categories.reporting+categories.accounting+categories.ai)/4)};
}

const recommendations:Record<RestaurantCategory,string>={
  foodCost:'Implement recipe costing and menu or buffet food-cost controls', purchasing:'Centralize purchasing history and vendor price comparison',
  inventory:'Connect ingredient inventory across cooler, freezer, and dry storage', operations:'Standardize kitchen and service workflows with demand visibility',
  waste:'Measure waste in units and dollars, then analyze overproduction patterns', labor:'Align staffing and productivity reporting with service demand',
  pos:'Integrate POS and online-order data through a governed integration layer', customer:'Build practical customer retention and promotion measurement workflows',
  reporting:'Create an owner dashboard for current operating and financial signals', training:'Deploy a private AI assistant grounded in approved recipes and SOPs',
  accounting:'Connect purchasing, expenses, POS summaries, and accounting controls', ai:'Prepare clean operating data for forecasting, anomaly detection, and management questions',
};
export function restaurantRecommendations(scores:RestaurantScores){return (Object.keys(categoryLabels) as RestaurantCategory[]).sort((a,b)=>scores.categories[a]-scores.categories[b]).slice(0,7).map((category,index)=>({category,label:recommendations[category],priority:index<3?'Quick Win':index<5?'Next Phase':'Advanced AI'}));}

const revenueMidpoints:Record<string,number>={'under-50k':42000,'50k-100k':75000,'100k-250k':175000,'250k-500k':375000,'500k+':600000};
export function restaurantOpportunityEstimate(answers:AssessmentAnswers,scores:RestaurantScores){
  const annualRevenue=(revenueMidpoints[String(answers.monthlyRevenue)]||75000)*12;
  const gap=(category:RestaurantCategory)=>(100-scores.categories[category])/100;
  const range=(rate:number,category:RestaurantCategory)=>[Math.round(annualRevenue*rate*gap(category)*.45/500)*500,Math.round(annualRevenue*rate*gap(category)/500)*500] as const;
  const areas=[['Food Cost Control',range(.025,'foodCost')],['Waste Reduction',range(.018,'waste')],['Purchasing Optimization',range(.012,'purchasing')],['Labor / Management Efficiency',range(.016,'labor')]] as const;
  return {areas,total:[areas.reduce((n,x)=>n+x[1][0],0),areas.reduce((n,x)=>n+x[1][1],0)] as const,disclaimer:'Potential opportunity based on reported revenue and readiness gaps—not a savings guarantee. Actual results require operational and financial analysis.'};
}

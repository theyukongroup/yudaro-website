import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const runtime=process.env.RUNTIME_NODE_MODULES||'C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {FileBlob,PresentationFile}=await import(createRequire(runtime+'/runtime-entry.cjs').resolve('@oai/artifact-tool'));
const R='C:/Users/l.leung/Documents/yudaro-website', T=R+'/marketing/restaurant-release', O=R+'/output/restaurant-release';
const SKILL='C:/Users/l.leung/.codex/plugins/cache/openai-primary-runtime/presentations/26.921.10847/skills/presentations';
const PY='C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const {finalizePresentation}=await import(pathToFileURL(SKILL+'/container_tools/artifact_tool_utils.mjs'));
process.env.RUNTIME_NODE_MODULES='C:/Users/l.leung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const D=JSON.parse((await fs.readFile(R+'/lib/restaurant-offer.json','utf8')).replace(/^\uFEFF/,''));
const hw=new Uint8Array(await fs.readFile(R+'/public/promotions/restaurant-pos-hardware.png'));
const colors={pos:'#087F8C',erp:'#08649E',ai:'#6653B9',ink:'#142E43',muted:'#526779',cream:'#FFF9EF',white:'#FFFFFF'};
let font='Aptos',bg=colors.cream;
function box(s,x,y,w,h,color){return s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill:color,line:{fill:'none',width:0}});}
function text(s,t,x,y,w,h,size=24,bold=false,color=colors.ink){const q=s.shapes.add({name:t.slice(0,45),geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});q.text=t;q.text.style={typeface:font,fontSize:size,bold,color,autoFit:'none',verticalAlignment:'middle',inset:0};return q;}
function reset(s,title,sub){s.shapes.deleteAll();for(const im of s.images.items)im.delete();s.background.fill=bg;box(s,0,0,1280,720,bg);text(s,'Yudaro',54,28,200,34,22,true,colors.pos);text(s,'RESTAURANT SOLUTIONS',820,32,405,28,14,true,colors.muted);text(s,title,54,90,1170,70,36,true);text(s,sub,54,164,1160,46,21,false,colors.muted);}
function foot(s,idx){text(s,'Yudaro  /  Restaurant POS and separate ERP services',54,682,1090,23,12,false,colors.muted);text(s,String(idx).padStart(2,'0'),1185,682,55,23,12,true,colors.muted);}
function ladder(s){reset(s,'Three Levels of the Yudaro Restaurant Solution','Separate purchases. Connected only through agreed implementation scope.');
 const data=[['RESTAURANT POS',colors.pos,'$899 + tax','$29.99/user/month','POS Support &\nPlatform Service','Run the checkout counter.','Orders · checkout · receipts\nHardware and POS setup','Get the $899 Restaurant\nPOS Package'],['RESTAURANT ERP',colors.erp,'$5,000','$300/month · up to 5 users','ERP Management,\nMaintenance & Support','Run the business.','Inventory · purchasing · vendors\nReporting and workflows','Schedule an ERP\nConsultation'],['PRIVATE AI + AUTOMATION',colors.ai,'Custom pricing','Separate scope','Private AI + Automation','Understand, automate, improve.','Approved knowledge · insights\nScoped workflow automation','Explore Private AI\n& Automation']];
 data.forEach((a,i)=>{const x=54+397*i;box(s,x,233,378,390,'#FFFFFF');box(s,x,233,378,8,a[1]);text(s,a[0],x+20,256,338,31,19,true,a[1]);text(s,a[2],x+20,306,338,50,i===2?33:43,true,a[1]);text(s,i===1?'One-time implementation':i===0?'One-time POS package':'Agreed independently',x+20,360,338,25,16);text(s,a[3],x+20,407,338,30,21,true);text(s,a[4],x+20,443,338,56,18,true,a[1]);text(s,a[5],x+20,508,338,32,19,true);text(s,a[6],x+20,546,338,50,17);});
 text(s,'POS runs the checkout counter. ERP runs the business.',54,638,1160,33,24,true,colors.pos);
}
function pos(s){reset(s,'$899 Restaurant POS Package','Yudaro Restaurant POS Platform · front-of-house ordering and checkout');
 text(s,'$899 + tax',54,233,500,81,62,true,colors.pos);text(s,'One-time hardware + POS setup',54,317,540,33,21);
 text(s,'$29.99/user/month',54,366,540,42,32,true,colors.pos);text(s,'POS Support & Platform Service',54,411,550,32,23,true);text(s,'Ongoing POS support and maintenance only',54,448,550,28,18,false,colors.muted);
 text(s,'POS installation • menu configuration within agreed scope\nPrinter/device setup • user setup • basic training',54,492,560,69,21);
 s.images.add({blob:hw,contentType:'image/png',fit:'contain',position:{left:654,top:222,width:563,height:286},alt:'Illustration of restaurant touchscreen, cash drawer, receipt printer and card reader'});
 text(s,'15.6-inch touchscreen • cash drawer\nEpson receipt printer • credit card reader',665,511,550,61,21,true);text(s,'Hardware illustration; final equipment may vary.',665,570,550,25,14,false,colors.muted);
 box(s,54,606,1164,57,colors.ink);text(s,D.pos.disclaimer,72,615,1120,39,24,true,'#FFFFFF');
 s.speakerNotes.textFrame.setText(D.pos.disclaimer+'\n'+D.pos.longDisclaimer+'\nPOS subscription: minimum one year. Get the $899 Restaurant POS Package: https://yudaro.com/contact?service=restaurant-pos');
}
function erp(s){reset(s,'Restaurant ERP — Separate Professional Service','Back-office management according to the agreed implementation scope.');
 box(s,54,232,1164,133,colors.erp);text(s,'$5,000',78,249,480,65,51,true,'#FFFFFF');text(s,'One-time implementation',78,318,480,30,22,false,'#FFFFFF');text(s,'$300/month · up to 5 users',653,255,540,49,31,true,'#FFFFFF');text(s,'ERP Management, Maintenance & Support',653,316,540,32,22,true,'#FFFFFF');
 text(s,'Inventory and ingredient records\nPurchasing and vendor management\nSales and management reporting\nMulti-location operations',66,396,550,157,25);
 text(s,'Accounting-related workflows\nCentralized data and permissions\nPOS-to-ERP integration\nWorkflow and AI integration capability*',665,396,550,157,25);
 text(s,'*Private AI and automation: separate/custom scope. Additional customization may be quoted separately.',66,562,1140,45,18,false,colors.muted);
 box(s,54,614,1164,52,'#E1EBF4');text(s,D.erp.disclaimer,66,619,1140,45,16,true,colors.erp);
 s.speakerNotes.textFrame.setText('Schedule an ERP Consultation: https://yudaro.com/contact?service=restaurant-erp\n'+D.erp.disclaimer);
}
function compare(s){reset(s,'POS vs ERP','Two products. Different operating needs. Separate purchase decisions.');
 const rows=[['RESTAURANT POS',colors.pos,'Front-of-house','$899 + tax','$29.99/user/month','POS Support & Platform Service','Ordering · checkout · receipts\nPayment workflow · POS users · POS reporting'],['RESTAURANT ERP',colors.erp,'Back-office business management','$5,000 implementation','$300/month · up to 5 users','ERP Management, Maintenance & Support','Inventory · purchasing · vendors\nManagement workflows · reports · integrations']];
 rows.forEach((a,i)=>{const x=54+i*594;box(s,x,235,570,329,'#FFFFFF');box(s,x,235,570,7,a[1]);text(s,a[0],x+22,258,528,32,23,true,a[1]);text(s,a[2],x+22,303,528,34,25,true);text(s,a[3],x+22,351,528,44,33,true,a[1]);text(s,a[4],x+22,402,528,35,25,true);text(s,a[5],x+22,442,528,33,21);text(s,a[6],x+22,494,528,57,20);});
 box(s,54,587,1164,73,colors.ink);text(s,'POS runs the checkout counter. ERP runs the business.',73,597,1120,38,29,true,'#FFFFFF');text(s,'ERP is optional and separately purchased. Private AI + Automation: custom pricing / separate scope.',73,636,1120,24,17,false,'#FFFFFF');
}
function pathSlide(s){reset(s,'Customer Upgrade Path','Start with POS. Add ERP only when the operational need and budget justify a separate purchase.');
 const steps=[['01','Restaurant owner','Choose the front-of-house scope.'],['02','$899 + tax POS','$29.99/user/month POS Support & Platform Service'],['03','Operational need grows','Schedule an ERP Consultation. ERP is OPTIONAL.'],['04','$5,000 ERP implementation','$300/month · ERP Management, Maintenance & Support · up to 5 users'],['05','Private AI + Automation','Custom pricing / separate scope · approved data and human review']];
 steps.forEach((a,i)=>{const y=228+i*77,col=i<2?colors.pos:i<4?colors.erp:colors.ai;box(s,54,y,1164,63,'#FFFFFF');box(s,54,y,63,63,col);text(s,a[0],58,y+10,59,40,23,true,'#FFFFFF');text(s,a[1],138,y+5,1060,31,24,true,col);text(s,a[2],138,y+36,1060,23,17);if(i<4)text(s,'↓',77,y+62,35,19,16,true,col);});
 text(s,'Higher-value managed relationship, earned through separately agreed scope and support.',54,636,1164,31,22,true);
}
const names=await fs.readdir(T+'/source-decks');
for(const name of names){
 const src=T+'/source-decks/'+name,dir=T+'/'+name.replace('.pptx','');const p=await PresentationFile.importPptx(await FileBlob.load(src));const original=[...p.slides.items];const records=JSON.parse(await fs.readFile(dir+'/texts.json','utf8'));
 const andy=name.startsWith('Yudaro_'),owner=name.includes('Owner');font=andy?'Arial':'Aptos';bg=andy?'#FAF8F2':colors.cream;
 const set=(id,t,size)=>{const q=p.resolve(id);q.text=t;if(size)q.text.style={fontSize:size};};
 for(const a of records){const t=a.text.replaceAll('$7,500','$5,000').replaceAll('Yudaro.com  •  Restaurant POS + Odoo ERP','Yudaro  /  Restaurant POS and separate ERP services').replaceAll('Odoo Restaurant POS screen','Yudaro Restaurant POS Platform');if(t!==a.text)set(a.id,t);}
 if(owner){
  set('sh/ts7md4r2','Restaurant POS for the counter. Optional, separately scoped ERP for the business.');set('sh/sryl4zqx','$899 + tax POS · $29.99/user/month POS service\nSeparate ERP: $5,000 + $300/month up to 5 users',17);
  set('sh/n2l4fq98','Choose the product that fits your need.\nERP and Private AI are optional, separate purchases.',26);
  set('sh/svmt4v6t','POS → kitchen → payment  |  ERP inventory integration is a separate purchase',20);
  set('sh/twfux0ne','Illustrative kitchen workflow. Devices and kitchen display are scoped separately.',22);
  set('sh/g72x4zyd','Separate ERP scope: connect approved stock and purchasing workflows.');
  set('sh/0b65obm9','Illustrative ERP dashboard. Reporting depends on the separate agreed ERP scope.',20);
  set('sh/cbu58j2h','ERP roles and labor workflows shown here require separate agreed implementation scope.',20);
  set('sh/wbih4b6d','Illustrative leakage, not guaranteed savings. Validate with the owner’s records.',21);
  set('sh/wbydknq1','POS: menu, tax/payment rules and users. ERP: inventory, vendors, approvals and reporting.',20);
  set('sh/m9c3e1kn','Choose POS setup now, or schedule a separate ERP consultation.',24);
  set('sh/na5476l8','If broader control is needed, scope an optional ERP project for inventory, purchasing and reports.',25);
  set('sh/kv2h4rqp','POS: $899 + tax + $29.99/user/month POS service\nERP: optional $5,000 + $300/month up to 5 users\nChoose scope, then plan setup, testing and training.',24);
  pos(original[4]);erp(original[6]);compare(original[11]);pathSlide(original[12]);const added=p.slides.add();ladder(added);added.moveTo(1);
 }else if(!andy){
  set('sh/ts7md4r2','POS: $899 + tax + $29.99/user/month\nOptional ERP: $5,000 + $300/month up to 5 users',18);
  set('sh/r65knqtk','Your job: match the owner’s need to POS, separate ERP or custom AI scope.',24);
  set('sh/svydgb65','ERP: $5,000 + $300/month up to 5 users.\nValidate savings; these figures are illustrative.',24);
  set('sh/0b65obm9','POS ordering and checkout; inventory, purchasing and finance are separate ERP scope.',20);
  set('sh/21gnuts7','“Is the concern the $5,000 implementation, $300/month support, or the expected business value?”',20);
  set('sh/na5476l8','“Would you like the POS package, or a separate ERP consultation?”',25);
  set('sh/90nq9gfi','Separate ERP scope + $300/month, up to 5 users',20);
  set('sh/14rqpgne','POS hardware + $29.99/user/month POS service',20);
  set('sh/je5knut0','Diagnose the operating need. Recommend standalone POS, separate ERP implementation, or custom Private AI. Never sell them as one included package.',26);
  set('sh/4felwzu5','Choose POS → confirm POS scope  |  Optional ERP → consultation → separate agreement',20);
  pos(original[9]);erp(original[10]);compare(original[13]);pathSlide(original[15]);const added=p.slides.add();ladder(added);added.moveTo(1);
 }else{
  set('sh/wjy9sry9','POS: $899 + tax + $29.99/user/month POS service. ERP is separate.',23);
  set('sh/g36tgryd','$899 + tax POS; $29.99/user/month POS service; ERP excluded',16);
  set('sh/6dwjqtw3','Governed knowledge and reviewed feedback preserve the company’s experience. Authorized leaders approve what becomes shared guidance.',20);
  set('sh/dc3y1s3m','Private AI + Automation: custom pricing and separate scope. Confirm data access, permissions and implementation requirements.',20);
  set('sh/nqlg3a5k','+$29.99/user/month POS-only service',17);
  set('sh/oruhcf65','Separate Restaurant ERP',21);set('sh/bulg7u5g','$5,000 + $300/month, up to 5 users',17);
  set('sh/8by18jq9','Custom scope: SOP search and guidance',17);
  set('sh/hsvmhkzq','Choose the right path: POS $899 + tax + $29.99/user/month; optional ERP $5,000 + $300/month up to 5 users; AI custom scope.',19);
  set('sh/mtwz6h0f','POS $899 + $29.99/user/month; separate ERP $5,000 + $300/month up to 5 users; AI custom.',17);
  set('sh/obyt0bel','Restaurant POS: $899 + tax + $29.99/user/month.\nSeparate ERP: $5,000 + $300/month up to 5 users.\nPrivate AI + Automation: custom pricing and scope.',25);
  ladder(original[5]);pos(original[6]);compare(original[7]);pathSlide(original[17]);const added=p.slides.add();erp(added);added.moveTo(8);
 }
 // Correct inherited source collisions between Andy's pictures/body and the header.
 if(andy){
  const sourceObjects=(await fs.readFile(dir+'/inspect.ndjson','utf8')).trim().split('\n').map(JSON.parse);
  for(const a of sourceObjects){
   if(!a.position || [0,5,6,7,17,24].includes(a.slideIndex))continue;
   const z=a.position, isHeader=a.kind==='textbox' && (z.top<138 || z.top>675);
   if(isHeader || z.top<70 || z.top>675 || !['shape','textbox','image'].includes(a.kind))continue;
   const q=p.resolve(a.id), top=200+Math.max(0,z.top-138)*0.84;
   const height=z.top<138?Math.max(40,Math.min(650,z.top+z.height)-200):z.height*0.84;
   if(a.kind==='image')q.frame={...z,top,height};else q.position={...z,top,height};

  }
 }
 // Re-number retained footer markers and add consistent markers to rebuilt slides.
 const snap=await p.inspect({kind:'textbox',maxChars:500000});const fresh=snap.ndjson.trim().split('\n').filter(Boolean).map(JSON.parse);
 for(const a of fresh){if(/^\d{1,2}$/.test(a.text||'')&&a.position?.top>660){set(a.id,String(a.slideIndex+1).padStart(2,'0'));}}
 const rebuilt=andy?[original[5],original[6],original[7],original[17],p.slides.items[8]]:owner?[original[4],original[6],original[11],original[12],p.slides.items[1]]:[original[9],original[10],original[13],original[15],p.slides.items[1]];
 for(const s of rebuilt)foot(s,p.slides.items.findIndex(a=>a.id===s.id)+1);
 // Retain source fonts and fix oversized source headings to fit their original frame.
 for(const a of fresh){if(a.kind==='textbox' && a.position?.top<85 && a.position?.top>20 && (a.style?.fontSize||0)>29){const q=p.resolve(a.id);if(!andy && a.slideIndex===2 && owner){q.text.style={fontSize:27};}else{q.position={...a.position,width:1160};q.text.style={fontSize:andy?34:32};}}}
 const candidate=dir+'/updated-draft.pptx';await(await PresentationFile.exportPptx(p)).save(candidate);
 const final=O+'/'+name.replace('.pptx','_Rebuilt_'+Date.now()+'.pptx');
 const dimensions=JSON.parse(await fs.readFile(T+'/deck-dimensions.json','utf8'))[name];
 try{await finalizePresentation({workspaceDir:R,candidatePath:candidate,finalPath:final,pythonExecutable:PY,integrityValidatorPath:SKILL+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:SKILL+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu',dimensions,'--validate-bullet-geometry','--validate-heading-fit'],requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],fontPolicy:{basis:'reference',families:andy?['Arial']:['Aptos','Aptos Display'],referencePath:src,referenceSha256:crypto.createHash('sha256').update(await fs.readFile(src)).digest('hex')},verifyArtifactToolImport:true,receiptPath:dir+'/validation-'+Date.now()+'.json'});console.log('FINALIZED',name,p.slides.items.length);}catch(e){console.log('FINALIZER_ERROR',name,String(e));}
 const finalSnap=await p.inspect({kind:'slide,textbox',maxChars:500000});await fs.writeFile(dir+'/after-inspect.ndjson',finalSnap.ndjson);
 for(let i=0;i<p.slides.items.length;i++){const blob=await p.export({slide:p.slides.items[i],format:'png',scale:1});await fs.writeFile(dir+`/after-${String(i+1).padStart(2,'0')}.png`,new Uint8Array(await blob.arrayBuffer()));}
 console.log('RENDERED',name);
}

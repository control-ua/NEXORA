
const defaultLeads = [
  {id:1,name:'Олександр К.', service:'Монтаж кондиціонера', phone:'+380 67 321 45 67', price:18500, status:'new', source:'Instagram', owner:'Олексій Марченко', note:'Передзвонити до 11:00', created:'Сьогодні, 09:12', history:['Заявка отримана з Instagram']},
  {id:2,name:'Марина П.', service:'Заміри вікон', phone:'+380 50 238 11 09', price:42000, status:'contact', source:'Сайт', owner:'Олексій Марченко', note:'КП вже відправлено', created:'Вчора, 16:40', history:['Заявка з сайту','Комерційну пропозицію відправлено']},
  {id:3,name:'Ігор М.', service:'Сервіс воріт', phone:'+380 93 517 02 20', price:12400, status:'work', source:'Telegram', owner:'Сергій Коваль', note:'Виїзд сьогодні', created:'14 вересня', history:['Заявка створена','Клієнту підтверджено виїзд','Передано в роботу']},
  {id:4,name:'ТОВ Альфа', service:'Монтаж обладнання', phone:'+380 66 190 77 52', price:96000, status:'contact', source:'Рекомендація', owner:'Арсен', note:'Очікуємо рішення директора', created:'13 вересня', history:['Заявка створена','Проведено дзвінок','КП на 96 000 ₴ відправлено']},
  {id:5,name:'Світлана Д.', service:'Клінінг офісу', phone:'+380 98 550 18 44', price:7600, status:'new', source:'Instagram', owner:'Олексій Марченко', note:'', created:'Сьогодні, 10:03', history:['Нова заявка з Instagram']},
  {id:6,name:'Роман В.', service:'Ремонт покрівлі', phone:'+380 63 447 29 60', price:68500, status:'work', source:'Сайт', owner:'Сергій Коваль', note:'Об’єкт відстає на 1 день', created:'12 вересня', history:['Заявка з сайту','Кошторис погоджено','Передано бригаді']}
];
let leads;
try { leads = JSON.parse(localStorage.getItem('nexora_leads')) || defaultLeads; } catch(e){ leads = defaultLeads; }
function saveLeads(){ localStorage.setItem('nexora_leads', JSON.stringify(leads)); }

const defaultObjects = [
  {id:101,title:'Монтаж кондиціонера', client:'Олександр К.', address:'вул. Старокозацька, 44', progress:65, crew:'Бригада 1', value:18500, deadline:'2026-09-15', photosBefore:2, photosAfter:0},
  {id:102,title:'Заміри та монтаж вікон', client:'Марина П.', address:'ж/м Перемога, 5', progress:35, crew:'Олексій', value:42000, deadline:'2026-09-18', photosBefore:3, photosAfter:0},
  {id:103,title:'Сервіс воріт', client:'Ігор М.', address:'вул. Калинова, 87', progress:80, crew:'Бригада 2', value:12400, deadline:'2026-09-15', photosBefore:2, photosAfter:1},
  {id:104,title:'Монтаж обладнання', client:'ТОВ Альфа', address:'просп. Поля, 112', progress:20, crew:'Бригада 3', value:96000, deadline:'2026-09-22', photosBefore:4, photosAfter:0},
  {id:105,title:'Ремонт покрівлі', client:'Роман В.', address:'вул. Робоча, 19', progress:52, crew:'Бригада 1', value:68500, deadline:'2026-09-14', photosBefore:5, photosAfter:0},
  {id:106,title:'Клінінг офісу', client:'Світлана Д.', address:'вул. Воскресенська, 14', progress:10, crew:'Марія', value:7600, deadline:'2026-09-16', photosBefore:1, photosAfter:0}
];
let objects;
try { objects=JSON.parse(localStorage.getItem('nexora_objects'))||defaultObjects; } catch(e){objects=defaultObjects}
function saveObjects(){localStorage.setItem('nexora_objects',JSON.stringify(objects));}

const team = [
  {name:'Олексій Марченко', role:'Менеджер', jobs:7, load:82, initials:'ОМ'},
  {name:'Сергій Коваль', role:'Майстер', jobs:4, load:74, initials:'СК'},
  {name:'Іван Гринь', role:'Монтажник', jobs:5, load:91, initials:'ІГ'},
  {name:'Марія Бондар', role:'Клінінг', jobs:3, load:63, initials:'МБ'},
  {name:'Андрій Левченко', role:'Монтажник', jobs:4, load:68, initials:'АЛ'},
  {name:'Дмитро Савчук', role:'Сервіс', jobs:6, load:86, initials:'ДС'}
];

const attention = [
  {type:'danger', title:'Клієнту не відповіли 47 хвилин', sub:'Олександр К. · Монтаж кондиціонера · 18 500 ₴'},
  {type:'warning', title:'КП відправлено 2 дні тому', sub:'Марина П. · потенційна угода 42 000 ₴'},
  {type:'danger', title:'Об’єкт відстає від плану', sub:'Ремонт покрівлі · затримка 1 день'}
];

function switchPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active', b.dataset.page===page));
  const titles = {dashboard:'Головна',leads:'Заявки',objects:'Об’єкти',team:'Команда',analytics:'Аналітика',tasks:'Завдання',settings:'Налаштування'};
  document.getElementById('page-title').textContent = titles[page];
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>switchPage(btn.dataset.page)));
document.querySelectorAll('[data-page-jump]').forEach(btn=>btn.addEventListener('click',()=>switchPage(btn.dataset.pageJump)));

const attentionList = document.getElementById('attention-list');
attention.forEach((a,i)=>{
  const el = document.createElement('div');
  el.className='attention-item '+(a.type==='warning'?'warning':'');
  el.innerHTML=`<span class="attention-dot"></span><div><b>${a.title}</b><small>${a.sub}</small></div><button class="mini-btn" data-attention="${i}">Відкрити</button>`;
  attentionList.appendChild(el);
});

function renderLeads(){
  const board = document.getElementById('lead-board');
  const filter = (document.getElementById('lead-search')?.value || '').toLowerCase();
  const source = document.getElementById('source-filter')?.value || '';
  const cols = [
    {key:'new',title:'Нові'},
    {key:'contact',title:'Контакт / КП'},
    {key:'work',title:'В роботі'}
  ];
  const visible = leads.filter(l => (l.name+l.service+l.phone).toLowerCase().includes(filter) && (!source || l.source===source));
  board.innerHTML='';
  cols.forEach(c=>{
    const col = document.createElement('div');
    col.className='kanban-col';
    const items = visible.filter(l=>l.status===c.key);
    col.innerHTML=`<h3>${c.title} · ${items.length}</h3>`;
    items.forEach(l=>{
      const card=document.createElement('div');
      card.className='lead-card';
      card.innerHTML=`<div class="lead-top"><b>${l.name}</b><span class="money">${Number(l.price).toLocaleString('uk-UA')} ₴</span></div>
        <small>${l.service}</small><small>${l.phone}</small>
        <span class="badge">${l.source}</span>
        <div class="lead-actions">
          <button data-open="${l.id}">Картка</button>
          <button data-next="${l.id}">${l.status==='new'?'В контакт →':l.status==='contact'?'В роботу →':'Завершити'}</button>
        </div>`;
      col.appendChild(card);
    });
    board.appendChild(col);
  });
  const active = leads.filter(l=>l.status!=='done');
  document.getElementById('kpi-active').textContent=active.length;
  document.getElementById('kpi-pipeline').textContent=active.reduce((s,l)=>s+Number(l.price||0),0).toLocaleString('uk-UA')+' ₴';
  document.getElementById('kpi-risk').textContent=leads.filter(l=>l.status==='new').length;
}
renderLeads();
document.getElementById('lead-search').addEventListener('input',renderLeads);
document.getElementById('source-filter').addEventListener('change',renderLeads);

document.getElementById('lead-board').addEventListener('click', e=>{
  const open=e.target.closest('[data-open]');
  const next=e.target.closest('[data-next]');
  if(open) openLead(Number(open.dataset.open));
  if(next) advanceLead(Number(next.dataset.next));
});

function advanceLead(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  if(l.status==='new'){l.status='contact';l.history.push('Статус змінено: Контакт / КП');}
  else if(l.status==='contact'){l.status='work';l.history.push('Статус змінено: В роботі');}
  else {l.status='done';l.history.push('Роботу завершено');}
  saveLeads(); renderLeads(); toast('Статус заявки оновлено');
}

function openLead(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  const statusName={new:'Нова',contact:'Контакт / КП',work:'В роботі',done:'Виконана'};
  openModal(`<div class="eyebrow">КАРТКА КЛІЄНТА</div>
    <h3>${l.name}</h3>
    <p>${l.service}<br>${l.phone}</p>
    <p><b>Сума:</b> ${Number(l.price).toLocaleString('uk-UA')} ₴<br><b>Відповідальний:</b> ${l.owner||'—'}<br><b>Джерело:</b> ${l.source}<br><b>Створено:</b> ${l.created||'—'}</p>
    ${l.note?`<p><b>Коментар:</b> ${l.note}</p>`:''}
    <select class="status-select" id="lead-status-edit">
      <option value="new" ${l.status==='new'?'selected':''}>Нова</option>
      <option value="contact" ${l.status==='contact'?'selected':''}>Контакт / КП</option>
      <option value="work" ${l.status==='work'?'selected':''}>В роботі</option>
      <option value="done" ${l.status==='done'?'selected':''}>Виконана</option>
    </select>
    <button class="primary-btn" style="width:100%" onclick="updateLeadStatus(${l.id})">Зберегти статус</button>
    <div class="activity-log">${(l.history||[]).slice().reverse().map(h=>`<div class="activity-row"><b>Подія</b><br>${h}</div>`).join('')}</div>`);
}
window.updateLeadStatus=function(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  const val=document.getElementById('lead-status-edit').value;
  l.status=val; l.history=l.history||[]; l.history.push('Статус змінено вручну');
  saveLeads(); closeModal(); renderLeads(); toast('Зміни збережено');
};

const objectGrid=document.getElementById('object-grid');
function renderObjects(){
  objectGrid.innerHTML='';
  objects.forEach(o=>{
    const overdue=o.deadline<'2026-09-15' && o.progress<100;
    const card=document.createElement('div');
    card.className='object-card'+(overdue?' overdue':'');
    card.innerHTML=`<div class="eyebrow">${overdue?'ПРОСТРОЧЕНО':'АКТИВНИЙ ОБ’ЄКТ'}</div><h3>${o.title}</h3>
      <div class="meta">${o.client}<br>${o.address}<br>${o.crew}<br>Дедлайн: ${o.deadline}</div>
      <div class="progress"><span style="width:${o.progress}%"></span></div>
      <div class="lead-top"><small>${o.progress}% виконано</small><b>${Number(o.value).toLocaleString('uk-UA')} ₴</b></div>
      <div class="object-actions"><button data-obj="${o.id}">Картка</button><button data-progress="${o.id}">+10%</button></div>`;
    objectGrid.appendChild(card);
  });
}
renderObjects();
objectGrid.addEventListener('click',e=>{
 const open=e.target.closest('[data-obj]'), prog=e.target.closest('[data-progress]');
 if(open){
   const o=objects.find(x=>x.id===Number(open.dataset.obj));
   openModal(`<div class="eyebrow">ОБ’ЄКТ</div><h3>${o.title}</h3><p>${o.client}<br>${o.address}</p>
   <p><b>Бригада:</b> ${o.crew}<br><b>Дедлайн:</b> ${o.deadline}<br><b>Прогрес:</b> ${o.progress}%<br><b>Вартість:</b> ${Number(o.value).toLocaleString('uk-UA')} ₴</p>
   <p><b>Фото до:</b> ${o.photosBefore||0}<br><b>Фото після:</b> ${o.photosAfter||0}</p>
   <button class="primary-btn" style="width:100%" onclick="addDemoPhoto(${o.id})">+ Додати фото після</button>`);
 }
 if(prog){
   const o=objects.find(x=>x.id===Number(prog.dataset.progress)); o.progress=Math.min(100,o.progress+10); saveObjects(); renderObjects(); toast('Прогрес об’єкта оновлено');
 }
});
window.addDemoPhoto=function(id){const o=objects.find(x=>x.id===id);o.photosAfter=(o.photosAfter||0)+1;saveObjects();closeModal();renderObjects();toast('Фото додано до об’єкта');};

document.getElementById('add-object').addEventListener('click',()=>{
 openModal(document.getElementById('object-form-template').innerHTML);
 document.getElementById('object-form').addEventListener('submit',e=>{
  e.preventDefault(); const f=new FormData(e.target);
  objects.unshift({id:Date.now(),title:f.get('title'),client:f.get('client'),address:f.get('address'),crew:f.get('crew'),deadline:f.get('deadline'),value:Number(f.get('value')),progress:0,photosBefore:0,photosAfter:0});
  saveObjects();closeModal();renderObjects();toast('Новий об’єкт створено');
 });
});
const teamGrid=document.getElementById('team-grid');
team.forEach(p=>{
  const card=document.createElement('div');
  card.className='team-card';
  card.innerHTML=`<div class="person-row"><div class="person-avatar">${p.initials}</div><div><h3>${p.name}</h3><div class="meta">${p.role}</div></div></div><div class="progress"><span style="width:${p.load}%"></span></div><div class="meta">Завантаження ${p.load}%</div><div class="team-stats"><div><b>${p.jobs}</b><span>активних задач</span></div><div><b>${Math.max(1,Math.round(p.jobs*.7))}</b><span>сьогодні</span></div></div>`;
  teamGrid.appendChild(card);
});

const barsData=[42,58,64,49,78,86,71];
const labels=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
const bars=document.getElementById('bars');
barsData.forEach((v,i)=>{
  const w=document.createElement('div'); w.className='bar-wrap';
  w.innerHTML=`<div class="bar" style="height:${v*2.4}px"></div><span>${labels[i]}</span>`;
  bars.appendChild(w);
});

function openModal(html){
  document.getElementById('modal-content').innerHTML=html;
  document.getElementById('modal-backdrop').classList.add('show');
}
function closeModal(){document.getElementById('modal-backdrop').classList.remove('show')}
window.closeModal=closeModal;
document.getElementById('modal-close').addEventListener('click',closeModal);
document.getElementById('modal-backdrop').addEventListener('click',e=>{if(e.target.id==='modal-backdrop') closeModal();});

document.getElementById('open-ai').addEventListener('click',()=>openModal(`
  <div class="eyebrow">AI-РЕКОМЕНДАЦІЇ</div>
  <h3>Сьогодні можна повернути до 74 800 ₴</h3>
  <p>NEXORA знайшла три ситуації, де швидка дія може підвищити шанс на продаж.</p>
  <ul>
    <li>Передзвонити Олександру — заявка без відповіді 47 хв.</li>
    <li>Повторно написати Марині — КП без реакції 2 дні.</li>
    <li>Уточнити затримку по ремонту покрівлі та попередити клієнта.</li>
  </ul>
`));

document.getElementById('demo-alerts').addEventListener('click',()=>openModal(`<div class="eyebrow">СПОВІЩЕННЯ</div><h3>3 нові події</h3><p>Нова заявка з Instagram · 6 хв тому</p><p>Бригада 1 прибула на об’єкт · 18 хв тому</p><p>КП переглянуто клієнтом · 31 хв тому</p>`));
document.getElementById('add-lead').addEventListener('click',()=>{
  const tpl=document.getElementById('lead-form-template');
  openModal(tpl.innerHTML);
  document.getElementById('lead-form').addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    leads.unshift({
      id:Date.now(), name:f.get('name'), phone:f.get('phone'), service:f.get('service'),
      price:Number(f.get('price')), source:f.get('source'), owner:f.get('owner'),
      note:f.get('note'), status:'new', created:'Щойно', history:['Заявку створено вручну']
    });
    saveLeads(); closeModal(); renderLeads(); toast('Нову заявку створено');
  });
});
document.getElementById('add-person').addEventListener('click',()=>openModal(`<div class="eyebrow">ДЕМО</div><h3>Додавання працівника</h3><p>У повній версії можна буде видати роль, права доступу та прив’язати Telegram.</p>`));

document.querySelectorAll('[data-attention]').forEach(()=>{});
attentionList.addEventListener('click',e=>{
  const btn=e.target.closest('[data-attention]');
  if(!btn) return;
  const a=attention[Number(btn.dataset.attention)];
  openModal(`<div class="eyebrow">NEXORA AI</div><h3>${a.title}</h3><p>${a.sub}</p><p>Рекомендована дія: зв’язатися з клієнтом або відповідальним співробітником зараз, щоб не втратити угоду.</p>`);
});


const loginBtn = document.getElementById('login-btn');
const loginScreen = document.getElementById('login-screen');
if (loginBtn && loginScreen) {
  loginBtn.addEventListener('click', () => {
    loginScreen.classList.add('is-hidden');
    document.body.classList.remove('login-active');
    window.scrollTo({top:0, behavior:'instant'});
  });
}

const toastEl=document.createElement('div');
toastEl.className='toast'; document.body.appendChild(toastEl);
function toast(text){toastEl.textContent=text;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2200);}

const defaultTasks=[
 {id:201,title:'Передзвонити Олександру',owner:'Олексій Марченко',due:'today',done:false},
 {id:202,title:'Уточнити затримку по покрівлі',owner:'Сергій Коваль',due:'overdue',done:false},
 {id:203,title:'Повторний контакт після КП',owner:'Арсен',due:'today',done:false},
 {id:204,title:'Перевірити фото з об’єкта',owner:'Сергій Коваль',due:'tomorrow',done:false}
];
let tasks;
try{tasks=JSON.parse(localStorage.getItem('nexora_tasks'))||defaultTasks}catch(e){tasks=defaultTasks}
let taskFilter='all';
function saveTasks(){localStorage.setItem('nexora_tasks',JSON.stringify(tasks))}
function renderTasks(){
 const box=document.getElementById('task-list'); if(!box)return; box.innerHTML='';
 const list=tasks.filter(t=>taskFilter==='all'||(taskFilter==='done'?t.done:(taskFilter==='overdue'?t.due==='overdue'&&!t.done:t.due===taskFilter&&!t.done)));
 list.forEach(t=>{
  const row=document.createElement('div');row.className='task-item'+(t.done?' done':'');
  const due={today:'Сьогодні',tomorrow:'Завтра',overdue:'Прострочено'}[t.due]||t.due;
  row.innerHTML=`<input class="task-check" type="checkbox" data-task-check="${t.id}" ${t.done?'checked':''}><div><b>${t.title}</b><small>${t.owner}</small></div><span class="badge ${t.due==='overdue'?'due-overdue':''}">${due}</span>`;
  box.appendChild(row);
 });
 if(!list.length) box.innerHTML='<div class="panel"><div class="meta">У цій категорії завдань немає.</div></div>';
}
renderTasks();
document.querySelectorAll('[data-task-filter]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-task-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');taskFilter=b.dataset.taskFilter;renderTasks();
}));
document.getElementById('task-list').addEventListener('change',e=>{
 if(!e.target.matches('[data-task-check]'))return;const t=tasks.find(x=>x.id===Number(e.target.dataset.taskCheck));t.done=e.target.checked;saveTasks();renderTasks();toast(t.done?'Завдання виконано':'Завдання повернуто');
});
document.getElementById('add-task').addEventListener('click',()=>{
 openModal(document.getElementById('task-form-template').innerHTML);
 document.getElementById('task-form').addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.target);tasks.unshift({id:Date.now(),title:f.get('title'),owner:f.get('owner'),due:f.get('due'),done:false});saveTasks();closeModal();renderTasks();toast('Завдання створено');
 });
});
document.getElementById('save-settings').addEventListener('click',()=>{
 const name=document.getElementById('company-name').value.trim()||'NEXORA Company';
 document.querySelector('.company-pill').textContent=name; localStorage.setItem('nexora_company',name);toast('Налаштування збережено');
});
const savedCompany=localStorage.getItem('nexora_company');if(savedCompany){document.getElementById('company-name').value=savedCompany;document.querySelector('.company-pill').textContent=savedCompany;}

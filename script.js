// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
  const form=document.querySelector('#task-form')
  const task=document.querySelector('#task-input')
  const board=document.querySelector('.board')
  const err=document.querySelector('.error')
  const selector=document.querySelector('#priority-select')
  const ul=document.querySelector('#task-list')
  const btnFilter=document.querySelectorAll('#filters button')
  const clear =document.querySelector('#clear-done')
    const empty =document.querySelector('#empty')

  board.appendChild(ul)
  const left=document.querySelector('#left')
  let countLeft=0
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(task.value.trim()!=''){
    let span=document.createElement('span')
    span.classList.add('text')
    let btn=document.createElement('button')
    btn.classList.add('delete')
    btn.innerHTML="x"
   let li=document.createElement('li')
   span.innerHTML=task.value
   li.classList.add(`priority-${selector.value}`)
   li.appendChild(span)
   li.appendChild(btn)
   ul.appendChild(li)
   task.value=""
    err.hidden=true
    countLeft++
    left.innerHTML=countLeft
    if(btnFilter[2].classList.contains('active'))
        li.hidden=true
        empty.hidden=true
    // li.addEventListener('click',(e)=>{
    //      e.target.classList.toggle('done')
    // })
}
   else{
    err.hidden=false
    err.innerHTML='Please type a task'
   }
   task.focus()

  })
 
  
// Step 2: click a task to toggle the "done" class
// ul.addEventListener('click', (e) => {
//     const li = e.target.closest('li');
//     const btn=e.target.closest('button')
//     if(btn&&li.contains(btn)){
//        console.log('Deleting:', li.textContent);
// console.log('Tasks before:', ul.querySelectorAll('li').length);

// li.remove();

// console.log('Tasks after:', ul.querySelectorAll('li').length);
//         return
//     }
//     if (li && ul.contains(li)&&!btn) {
//         li.classList.toggle('done');
//     }
    
    
// });
ul.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li || !ul.contains(li)) return;
    let subDone=li.classList.contains('done')

    const btn = e.target.closest('button.delete');

    if (btn && li.contains(btn)) {
        li.remove();
        if(!subDone){
            countLeft--
        if(ul.children.length==0)
        empty.hidden=false}
        left.innerHTML=countLeft
        return;
    }
    if(!subDone)
        countLeft--
    else countLeft++
    li.classList.toggle('done');
    left.innerHTML=countLeft
});
// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)
for(let i of btnFilter){
    i.addEventListener('click',(e)=>{
      btnFilter.forEach(b=>{b.classList.remove('active')})
      e.target.classList.add('active')
      switch(e.target.dataset.filter){
        case 'active':
        for(let l of ul.children){
            if(l.classList.contains('done'))
                l.hidden=true
            else
                 l.hidden=false

        }
        break;
         case 'done':
             for(let l of ul.children){
            if(!l.classList.contains('done'))
                l.hidden=true
        
        else 
            l.hidden=false}
        break
        case 'all':
             for(let l of ul.children){
                l.hidden=false
             }
      }
      
    })
}
// Step 6: Clear completed
clear.addEventListener('click',()=>{
    for(let l of ul.children){
                if(l.classList.contains('done') )
                    l.remove()
             }
             if(ul.children.length==0)
        empty.hidden=false
})
// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")

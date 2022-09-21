const editPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  console.log(event.target);
  console.log('-----------');
  console.log(event);
  console.log('-----------');
  console.log(event.submitter.id);
  console.log('-----------');

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log('HHHHHHHHHHHHHHHHHH ++++++++++')
  console.log('update id = ', id);

  if (title && content) {
    // const response = await fetch('/update/' + id, {
    //   method: 'PUT',
    //   body: JSON.stringify({ title, content }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    let response = "";

    if (event.submitter.id === 'update-button') {
      response = await fetch('/update/' + id, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      console.log('else delete statement');
      
      response = await fetch('/delete/' + id, { 
        method: 'DELETE' 
      }); 
    }

    if (response.ok) {
      // document.location.replace('/user-posts');
      // document.location.replace('/');
    } else {
      alert('Failed to update or delete.');
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', editPostFormHandler);
// Method to submit the form data for new post using AJAX
{
let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/posts/create",
            data: newPostForm.serialize(), // Converts data to JSON object
            success: function (data) {
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
            }, error : function(error){
                console.log(error.responseText);
            }
        });
    });
}

// Method to create post in DOM

let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
                    ${post.content} <br>
                    <small>
                        ${post.user.name}
                    </small>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post.id}">
                                <button>
                                    Delete Post
                                </button>
                            </a>
                        </small>
                </li>
                </p>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type here to add a comment..." required size="30">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                    <div class="post-comments-list">
                        <small><b>Comments : </b></small> <br>
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
                </div>`);
}

createPost();
}
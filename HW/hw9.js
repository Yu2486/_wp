from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from models import Post, get_db  # 假設您有 Post 模型和 get_db 函式
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

@app.delete("/posts/{post_id}")
async def delete_post(request: Request, post_id: int, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="未登入")
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="貼文不存在")
    if post.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="無權限刪除此貼文")
    db.delete(post)
    db.commit()
    return JSONResponse(content={"message": "貼文已刪除"}, status_code=status.HTTP_200_OK)
{% for post in posts %}
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    {% if post.user_id == session['user_id'] %}
      <button onclick="deletePost({{ post.id }})">刪除</button>
    {% endif %}
  </div>
{% endfor %}
<script>
  function deletePost(postId) {
    if (confirm("確定要刪除這篇貼文嗎？")) {
      fetch(`/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include' 
      })
      .then(response => {
        if (response.ok) {
          alert("貼文已刪除");
          location.reload();
        } else {
          response.json().then(data => alert(data.detail || "刪除失敗"));
        }
      });
    }
  }
</script>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	if(session.getAttribute("page_load") == null)
	{
		String id = request.getParameter("id");
		System.out.println("FROM PAGE: "+id);
		response.sendRedirect(request.getContextPath()+"/SearchPath?flag=byActor&id="+id);
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>${actor.actor}</title>
</head>
<body>
<h1><a href="actor.jsp?flag=byActor&id=${actor.id}">${actor.actor}</a></h1>
<img src = "${actor.image_url}"/>
<p> ${actor.biography}</p>
<h2>Fan Comments</h2>
<c:choose>
<c:when test="${not empty actor.list_comment }">
<c:forEach items="${actor.list_comment}" var="comment" >
<p>${comment.comment_content}</p>
</c:forEach>
</c:when>
<c:otherwise>
<p>No comments so far. Be the first to comment. </p>
</c:otherwise>
</c:choose>
<form action="<%=request.getContextPath()%>/SearchPath" method="post">
<p>Enter Comment:</p><input type = "text" name="comment">
<input type = "hidden" name = "flag" value = "insert_comment">
<input type = "hidden" name = "id" value = "<%=request.getParameter("id") %>">
<input type = "submit" value = "Comment">
</form>
<%session.setAttribute("page_load", null);%>
</body>
</html>
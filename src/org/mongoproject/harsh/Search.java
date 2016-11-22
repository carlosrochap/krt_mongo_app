package org.mongoproject.harsh;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;



import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.bson.Document;
import org.bson.types.ObjectId;

import vo.Actor;
import vo.Comment;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.regex;

/**
 * Servlet implementation class Search
 */

public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		HttpSession session=request.getSession();
		System.out.println("Servlet Called!");
		String flag = request.getParameter("flag");
		if(flag.equals("search"))
		{
		String search = request.getParameter("search");
		String search_pattern = ".*" + search + ".*";
		System.out.println("Search-term from textbox: "+search);
		//Mongo Connection
		MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
		MongoDatabase database = mongoClient.getDatabase("imdb");
		MongoCollection<Document> collection = database.getCollection("actors");
		//End Mongo Connection
		//Search
		
		final List<Actor> list_actor = new ArrayList<Actor>();
		FindIterable<Document> iterable = collection.find(regex("biography", search_pattern, "i"));
		iterable.forEach(new Block<Document>() {
		    @Override
		    public void apply(final Document document) 
		    {
		    	Actor actor = new Actor();
		    	actor.setId((ObjectId) document.get("_id"));
		    	actor.setActor(document.getString("actor"));
		    	actor.setImage_url(document.getString("image_url"));
		    	actor.setBiography(document.getString("biography"));
		    	list_actor.add(actor);
		        System.out.println("Results: "+document);
		        System.out.println("Size: "+list_actor.size());
		    }
		});
		//End Search
		mongoClient.close();
		session.setAttribute("size", list_actor.size());
		session.setAttribute("list_actor", list_actor);
		session.setAttribute("page_load", true);
		response.sendRedirect("index.jsp?flag=search&search="+search);
		}
		else if(flag.equals("byActor"))
		{
			String id_string = request.getParameter("id");
			ObjectId id = new ObjectId(id_string);
			//Mongo Connection
			MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
			MongoDatabase database = mongoClient.getDatabase("imdb");
			MongoCollection<Document> collection = database.getCollection("actors");
			//End Mongo Connection
			//Search
			final List<Comment> list_comment = new ArrayList<Comment>();
 			final Actor actor  = new Actor();
			FindIterable<Document> iterable = collection.find(new Document("_id", id));
			iterable.forEach(new Block<Document>() {
			    @Override
			    public void apply(final Document document) 
			    {
			    	actor.setId((ObjectId) document.get("_id"));
			    	actor.setActor(document.getString("actor"));
			    	actor.setImage_url(document.getString("image_url"));
			    	actor.setBiography(document.getString("biography"));
			    	List<Document> list = (List<Document>) document.get("Comments");
			    	if(list!=null)
			    	{
			    	for(int i = 0; i<list.size(); i++)
			    	{
			    		Comment comment = new Comment();
			    		comment.setId((ObjectId)list.get(i).get("comment_id"));
			    		comment.setComment_content((String)list.get(i).get("comment"));
			    		list_comment.add(comment);
			    	}
			    	actor.setList_comment(list_comment);
			    	System.out.println(list_comment.size());
			    	}
			        System.out.println("Results: "+document);
			    }
			});
			mongoClient.close();
			session.setAttribute("actor", actor);
			session.setAttribute("page_load", true);
			response.sendRedirect("actor.jsp?flag=byActor&id="+id_string);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		HttpSession session=request.getSession();
		System.out.println("Servlet Called!-post");
		String flag = request.getParameter("flag");
		if(flag.equals("insert_comment"))
		{
			String id_string = request.getParameter("id");
			System.out.println("insert comment"+id_string);
			ObjectId id = new ObjectId(id_string);
			String content = request.getParameter("comment");
			MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
			MongoDatabase database = mongoClient.getDatabase("imdb");
			MongoCollection<Document> collection = database.getCollection("actors");
			Document document2 = new Document("comment_id",new ObjectId()).append("comment", content);
			collection.updateOne(new Document("_id",id), new Document("$push",new Document("Comments",document2)));
			mongoClient.close();
			response.sendRedirect("actor.jsp?flag=byActor&id="+id_string);
		}
		
	}

}

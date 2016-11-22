package api;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static com.mongodb.client.model.Filters.eq;

/**
 * Created by Carlos on 11/16/2016.
 */
@WebServlet(name = "Comments")
public class Comments extends HttpServlet {
    public Comments(){

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String docId = request.getParameter("docId");
        String text = request.getParameter("text");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        MongoClient client = new MongoClient("localhost",27017);
        MongoDatabase db = client.getDatabase("mydb");
        MongoCollection collection = db.getCollection("ActorList");

        BasicDBObject comment = new BasicDBObject();
        comment.put("user", "mkyongDB");
        comment.put("text", text);

        collection.updateOne(eq("_id", new ObjectId(docId) ),
            new BasicDBObject("$push",
                    new BasicDBObject("comments", comment)));

        out.println("inserting comments 4");

        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String docId = request.getParameter("docId");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        MongoClient client = new MongoClient("localhost",27017);
        MongoDatabase db = client.getDatabase("mydb");
        MongoCollection collection = db.getCollection("Comments");

//        String regexPattern = ".*" + searchText + ".*";
        BasicDBObject query = new BasicDBObject("_id.$oid", docId);
        FindIterable results = collection.find(query);
        String serialize = JSON.serialize(results);
        out.println(serialize);

        out.close();

    }
}

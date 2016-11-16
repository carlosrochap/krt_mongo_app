package api;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static com.mongodb.client.model.Filters.regex;

/**
 * Created by Carlos on 11/16/2016.
 */
@WebServlet(name = "ActorSearch")
public class ActorSearch extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String searchText = request.getParameter("search-text");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        MongoClient client = new MongoClient("localhost",27017);
        MongoDatabase db = client.getDatabase("mydb");
        MongoCollection collection = db.getCollection("ActorList");

        String regexPattern = ".*" + searchText + ".*";
        FindIterable results = collection.find(regex("biography", regexPattern, "i"));
        String serialize = JSON.serialize(results);
        out.println(serialize);

        out.close();
    }
}

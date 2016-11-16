package test;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.*;
import javax.servlet.*;

import static com.mongodb.client.model.Filters.regex;

public class HelloServlet extends HttpServlet {

    public void doPost (HttpServletRequest req,
                       HttpServletResponse res)
            throws ServletException, IOException
    {

        String searchText = req.getParameter("search-text");
        res.setContentType("application/json");
        PrintWriter out = res.getWriter();

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
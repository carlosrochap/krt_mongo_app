package test;

import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.*;
import javax.servlet.*;

public class HelloServlet extends HttpServlet {
    public void doGet (HttpServletRequest req,
                       HttpServletResponse res)
            throws ServletException, IOException
    {
        PrintWriter out = res.getWriter();

        out.println("Hello, world from servlet!");
        List<String> foo = new ArrayList<String>();
        foo.add("A");
        foo.add("B");
        foo.add("C");

        String json = new Gson().toJson(foo );
        out.println(json);
        //Here is the maven dependency for Gson
        out.close();
    }
}
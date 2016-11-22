package vo;

import java.io.Serializable;

import org.bson.types.ObjectId;

public class Comment  implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8942548670421820133L;
	private ObjectId id;
	private String comment_content;
	public ObjectId getId() {
		return id;
	}
	public void setId(ObjectId id) {
		this.id = id;
	}
	public String getComment_content() {
		return comment_content;
	}
	public void setComment_content(String comment_content) {
		this.comment_content = comment_content;
	}
}

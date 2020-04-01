public class Ball{
	private float x;
	private float y;
	private int r;
	private float xDelta;
	private float yDelta;
	public Ball(float x, float y, int r, int speed, int direction){
			this.x=x; this.y=y;	this.r=r;
			this.xDelta=xDelta;
			this.yDelta=yDelta;
			
			this.xDelta=(float) Math.cos(direction)*speed;
			this.yDelta=(float) Math.sin(direction)*speed;
	}


	public float getX()
	{
		return this.x;
	}

	public void setX(float x)
	{
		this.x=x;
	}
	
	public float getY()
	{
		return this.y;
	}

	public void setY(float x)
	{
		this.x=x;
	}

	public int getRadius()
	{
		return this.r;
	}

	public void setRadius(int r)
	{
		this.r=r;
	}

	public float getxDelta()
	{
		return this.xDelta;
	}

	public void setxDelta()
	{
		this.xDelta=xDelta;
	}

	public float getyDelta()
	{
		return this.yDelta;
	}

	public void setyDelta()
	{
		this.yDelta=yDelta;
	}

	public void move()
	{
		x=x+xDelta;
		y=y+yDelta;
	}

	public void reflectHorizontal()
	{
		xDelta=-yDelta;
	}

	public void reflectVertical()
	{
		yDelta=-xDelta;
	}

	public String toString()
	{
		return "Ball[("+ this.x+","+this.y+"), speed="+this.xDelta+","+this.yDelta+")]";
	}




}

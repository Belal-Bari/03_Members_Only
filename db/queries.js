const pool = require('./pool');

async function getAllPosts() {
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.post, posts.date, members.name AS author_name
      FROM posts
      JOIN members ON posts.author = members.id
      ORDER BY posts.date DESC
    `);
    return result.rows; // Array of post objects
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

async function postNewUser(firstname, lastname, username, password, isMember, isAdmin) {
  const name = firstname + ' ' + lastname;
  await pool.query(`INSERT INTO members (name, username, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5)`, [name, username, password, isMember, isAdmin])
}

async function getMember(username) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM members
      WHERE username = $1
    `, [username]);
    return result.rows[0]; // Array of post objects
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

async function getMemberThroughId(id) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM members
      WHERE id = $1
    `, [id]);
    if (result.rows.length === 0) return null;
    
    return result.rows[0]; // Array of post objects
  } catch (err) {
    console.error('Error fetching member:', err);
    return [];
  }
}

async function postNewPost(post, author_id) {
  try {
    await pool.query(
      `INSERT INTO posts (post, author) VALUES ($1, $2)`,
      [post, author_id]
    );
    console.log('Post inserted successfully.');
  } catch (err) {
    console.error('Error inserting post:', err);
  }
}

async function changeMembershipStatus(userId) {
  try {
    await pool.query(
      'UPDATE members SET is_member = TRUE WHERE id = $1',
      [userId]
    );
    console.log(`Membership status updated for user ID: ${userId}`);
  } catch (err) {
    console.error('Error updating membership status:', err);
  }
};

async function changeAdminStatus(userId) {
  try {
    await pool.query(
      'UPDATE members SET is_admin = TRUE WHERE id = $1',
      [userId]
    );
    console.log(`Membership status updated for user ID: ${userId}`);
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(id){
  try {
    await pool.query(
      'DELETE FROM posts WHERE id = $1',
      [id]
    );
    console.log('Post deleted');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getAllPosts,
    postNewUser,
    getMember,
    getMemberThroughId,
    postNewPost,
    changeMembershipStatus,
    changeAdminStatus,
    deletePost
}
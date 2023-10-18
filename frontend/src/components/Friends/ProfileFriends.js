// import { useSelector, useDispatch } from "react-redux";
// import { getUsers, fetchUsers } from "../../store/users";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileFriends.css";

function ProfileFriends({ user, users }) {
  // const users = useSelector(getUsers);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  if (!users) return null;

  // return (
  //   <div className="friends-component-container">
  //     <ul className="friend">
  //       {users &&
  //         user &&
  //         users
  //           .filter((friend) => user.id !== friend.id)
  //           .map((friend) => {
  //             return (
  //               <div className="friend">
  //                 <li key={friend.id}>
  //                   <Link to={`/users/${friend.id}`}>
  //                     <img alt="" src={friend.avatarUrl} />
  //                     <h5>
  //                       {friend.firstName} {friend.lastName}
  //                     </h5>
  //                   </Link>
  //                 </li>
  //               </div>
  //             );
  //           })}
  //     </ul>
  //   </div>
  // );
  return (
    <div className="friends-component-container">
      <ul className="friend">
        {users &&
          user &&
          user.friendRequests?.map((request) => {
            if (request.status) {
              return (
                <div className="friend">
                  <li key={request.id}>
                    <Link to={`/users/${request.userId}`}>
                      <img alt="" src={users[request.userId - 1]?.avatarUrl} />
                      <h5>
                        {users[request.userId - 1]?.firstName}{" "}
                        {users[request.userId - 1]?.lastName}
                      </h5>
                    </Link>
                  </li>
                </div>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default ProfileFriends;

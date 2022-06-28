import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getList } from "../actions/listActions";
import { formatAddress } from "../utils/formatUtils";
import AddressLink from "./addressLink";

function List({ listData, loading, getList }) {
  const location = useLocation();
  useEffect(() => {
    getList(location.pathname);
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  } else {
    if (!listData) {
      return <div>NO DATA</div>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>addres</th>
              <th>balance</th>
              <th>aROI</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((el, id) => (
              <tr key={id}>
                <td><AddressLink address={el.addres}/></td>
                <td>{el.tokenBalance}</td>
                <td>{el.aROI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  listData: state.list.topList,
  loading: state.list.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getList: (location) => dispatch(getList(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

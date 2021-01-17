import styled from 'styled-components/macro';

export const Container = styled.div`
  overflow: auto;
`;

export const TableContainer = styled.table`
  background-color: white;
  color: black;
  border-radius: 2px;
  width: 100%;
`;

export const HeaderContainer = styled.thead`
  tr {
    th {
      padding: 15px;
      border-width: 0;
      border-bottom-width: 1px;
      border-right-width: 1px;
      border-color: #ccc;
      border-style: solid;
    }
    th:last-child {
      border-right: 0;
    }
  }
`;

export const BodyContainer = styled.tbody`
  tr {
    td {
      padding: 15px;
      border-width: 0;
      border-bottom-width: 0.5px;
      border-right-width: 0.5px;
      border-color: #e8e8e8;
      border-style: solid;
    }
    td:last-child {
      border-right: 0;
    }
    div.actions {
      display: flex;
      justify-content: space-around;
    }
  }
`;

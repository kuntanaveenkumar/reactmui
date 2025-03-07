import React, { lazy } from "react";
const LoginForm = lazy(() => import('./LoginForm'));
import '../../css/Login.less';
import '../../css/MainLayout.less';
import { CustomTable, CustomTableBody, CustomTableRow, CustomTableCell } from '../common/CustomTable';
const Login = () => {
  const initialValues = {
    email: "",
    password: ""
  };
  return <>
    <CustomTable>
      <CustomTableBody>
        <CustomTableRow>
          <CustomTableCell>
            <div className="homebanner">EVO</div>
          </CustomTableCell>
        </CustomTableRow>
        <CustomTableRow>
          <CustomTableCell>
            <LoginForm initialValues={initialValues} />
          </CustomTableCell>
        </CustomTableRow>
      </CustomTableBody>
    </CustomTable>
  </>
};
export default Login;

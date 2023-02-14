import { useMemo } from "react";
import { rolesColumns } from "./core/RoleColumns";
import { useQueryResponseData, useQueryResponseLoading } from "../../../modules/table/QueryResponseProvider";
import { McTable } from "../../../components/McTable";

const RoleTable = () => {
  const roles = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => roles, [roles]);
  const columns = useMemo(() => rolesColumns, []);

  return (
    <McTable
      data={data}
      columns={columns}
      model={roles.length > 0 ? roles[0] : null}
      isLoading={isLoading}
    />
  );
};

export { RoleTable };

import React, { useEffect, useMemo, useState } from "react";
import {KTCard, KTCardBody, QUERIES} from '../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getGames} from '../core/GameRequests'
import {ListViewProvider} from '../../../modules/table/ListViewProvider'
import {GameFilters} from '../partials/GameFilters'
import {KTCardHeader} from '../../../helpers/components'
import GamesColumns from '../core/GameColumns'
import {McTable} from '../../../components/McTable'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../components/misc/CardAction'
import { useMcApp } from "../../../modules/general/McApp";
import { generatePageTitle } from "../../../helpers/pageTitleGenerator";
import { Sections } from "../../../helpers/sections";
import { PageTypes } from "../../../helpers/variables";

const GameIndex = () => {
  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const mcApp = useMcApp()

  useEffect(() => {
    mcApp.setPageTitle(generatePageTitle(Sections.GAMES, PageTypes.INDEX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.GAMES_LIST} requestFunction={getGames}>
        <ListViewProvider>
          <KTCard>
            <KTCardHeader
              text='All Games'
              icon='fa-regular fa-list'
              icon_style='fs-3 text-primary'
              actions={[
                new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                new FilterCardAction('games-list-filter', showFilter, setShowFilter),
                new CreateCardAction('/games', 'manage-games'),
              ]}
            />
            <KTCardBody>
              <GameFilters setExportQuery={setExportQuery} showFilter={showFilter} />

              <GameTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export default GameIndex

const GameTable = () => {
  const games = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => games, [games])
  const columns = useMemo(() => GamesColumns, [])

  return (
    <McTable
      data={data}
      columns={columns}
      model={games.length > 0 ? games[0] : null}
      isLoading={isLoading}
    />
  )
}

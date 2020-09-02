
LW.Utilities.Assign('Grid.Pager', class Pager {
    _refreshPaging(pageIndexChanged) {
        const that = this;

        requestAnimationFrame(() => {
            that._refreshLayout();
            that._refreshSelection();

            if (!pageIndexChanged) {
                that._initializeRowElements();
                that._refreshLayout();
            }

            if (that.dataSource && that.dataSource.virtualDataSource) {
                that._virtualDataRequest(!pageIndexChanged ? 'pageSizeChange' : 'pageIndexChange');
            }
            else {
                that._recycle(false);
            }

            const first = that.paging.pageIndex * that.paging.pageSize;
            const last = first + that.paging.pageSize;

            that.$.fireEvent('page', {
                'data': {
                    first: first,
                    last: last,
                    size: last - first
                }
            });
        });
    }

    _refreshPagesCount() {
        const that = this;

        const getPagesCount = function () {
            const visibleRows = that.getVisibleRows();

            let rowsCount = visibleRows.length;

            if (that.rowHierarchy) {
                rowsCount = 0;

                for (let i = 0; i < visibleRows.length; i++) {
                    const row = visibleRows[i];

                    if (row.level === 0 && !row.parent) {
                        rowsCount++;
                    }
                }

                if (that.dataSource.virtualDataSourceLength !== undefined) {
                    rowsCount = that.dataSource.virtualDataSourceLength;
                }
            }

            return { pagesCount: Math.ceil(rowsCount / that.paging.pageSize), totalRecords: rowsCount };
        }

        const headerPager = that.$.headerPager.querySelector('lw-pager');
        const pagesCountInfo = getPagesCount();

        if (headerPager) {
            headerPager.pagesCount = pagesCountInfo.pagesCount;
            headerPager.totalRecords = pagesCountInfo.totalRecords;
        }

        const footerPager = that.$.footerPager.querySelector('lw-pager');

        if (headerPager) {
            footerPager.pagesCount = pagesCountInfo.pagesCount;
            footerPager.totalRecords = pagesCountInfo.totalRecords;
        }

        if (that.paging.pageIndex > pagesCountInfo.pagesCount) {
            that.paging.pageIndex = pagesCountInfo.pagesCount - 1;
            that._refreshPaging(that.paging.pageIndex);
        }
    }

    _renderPagers() {
        const that = this;
        if (that.pager.visible) {
            requestAnimationFrame(() => {
                const headerPager = document.createElement('lw-pager');
                const footerPager = document.createElement('lw-pager');

                that.$.headerPager.innerHTML = '';
                that.$.footerPager.innerHTML = '';

                that.$.headerPager.appendChild(headerPager);
                that.$.footerPager.appendChild(footerPager);

                const localizePager = function (pager) {
                    const messages = pager.messages[that.locale]
                    if (!messages) {
                        pager.messages[that.locale] = {
                        };
                    }

                    Object.assign(pager.messages[that.locale], {
                        'firstButton': that.localize('pagerFirstButton'),
                        'lastButton': that.localize('pagerLastButton'),
                        'previousButton': that.localize('pagerPreviousButton'),
                        'nextButton': that.localize('pagerNextButton'),
                        'navigateToLabel': that.localize('pagerNavigateToLabel'),
                        'pageSizeLabel': that.localize('pagerPageSizeLabel'),
                        'navigateToInputPlaceholder': that.localize('pagerNavigateToInputPlaceholder'),
                        'ellipsis': that.localize('pagerEllipsis'),
                        'summaryString': that.localize('pagerSummaryString'),
                        'summaryPrefix': that.localize('pagerSummaryPrefix'),
                        'summarySuffix': that.localize('pagerSummarySuffix'),
                    });
                }

                const getPagesCount = function () {
                    const visibleRows = that.getVisibleRows();

                    let rowsCount = visibleRows.length;

                    if (that.rowHierarchy) {
                        rowsCount = 0;

                        for (let i = 0; i < visibleRows.length; i++) {
                            const row = visibleRows[i];

                            if (row.level === 0 && !row.parent) {
                                rowsCount++;
                            }
                        }

                        if (that.dataSource.virtualDataSourceLength !== undefined) {
                            rowsCount = that.dataSource.virtualDataSourceLength;
                        }
                    }

                    return { pagesCount: Math.ceil(rowsCount / that.paging.pageSize), totalRecords: rowsCount };
                }

                const addPropertyBindings = function (pager, pagerPosition) {
                    const id = pagerPosition + 'GridPager',
                        pagesCountInfo = getPagesCount();

                    pager.setAttribute('lw-id', id);
                    that.$[id] = pager;
                    that['$' + id] = LW.Utilities.Extend(pager);

                    pager.beginUpdate();
                    that.addPropertyBinding('[[pager_navigationButtons_position]]', 'navigationButtonsPosition', pager);
                    that.addPropertyBinding('[[pager_navigationButtons_firstLastButtons_visible]]', 'showFirstLastNavigationButtons', pager);
                    that.addPropertyBinding('[[pager_navigationButtons_prevNextButtons_visible]]', 'showPrevNextNavigationButtons', pager);
                    that.addPropertyBinding('[[pager_navigationButtons_labels_visible]]', 'showNavigationButtonLabels', pager);
                    that.addPropertyBinding('[[pager_pageIndexSelectors_visible]]', 'showPageIndexSelectors', pager);
                    that.addPropertyBinding('[[pager_pageIndexSelectors_dataSource]]', 'pageIndexSelectors', pager);
                    that.addPropertyBinding('[[pager_summary_visible]]', 'showSummary', pager);
                    that.addPropertyBinding('[[pager_summary_position]]', 'summaryPosition', pager);
                    that.addPropertyBinding('[[pager_navigationInput_visible]]', 'showNavigationInput', pager);
                    that.addPropertyBinding('[[pager_navigationInput_position]]', 'navigationInputPosition', pager);
                    that.addPropertyBinding('[[pager_pageSizeSelector_visible]]', 'showPageSizeSelector', pager);
                    that.addPropertyBinding('[[pager_pageSizeSelector_dataSource]]', 'pageSizeSelectorDataSource', pager);
                    that.addPropertyBinding('[[pager_pageSizeSelector_position]]', 'pageSizeSelectorPosition', pager);
                    that.addPropertyBinding('[[pager_autoEllipsis]]', 'autoEllipsis', pager);
                    that.addPropertyBinding('[[!paging_enabled]]', 'disabled', pager);
                    that.addPropertyBinding('{{paging_pageIndex}}', 'pageIndex', pager);
                    that.addPropertyBinding('{{paging_pageSize}}', 'pageSize', pager);
                    that.addPropertyBinding('{{rightToLeft}}', 'rightToLeft', pager);

                    pager.pagesCount = pagesCountInfo.pagesCount;
                    pager.totalRecords = pagesCountInfo.totalRecords;
                    pager.$.pageSizeSelector.dropDownAppendTo = 'body';
                    pager.$.pageSizeSelector.selectedIndexes = [0];

                    that['$' + id].listen('change', function (event) {
                        const pagesCountInfo = getPagesCount();

                        pager.pagesCount = pagesCountInfo.pagesCount;
                        pager.totalRecords = pagesCountInfo.totalRecords;

                        if (that.paging.pageIndex > pager.pagesCount) {
                            that.paging.pageIndex = pager.pagesCount - 1;
                        }

                        headerPager.refresh();
                        footerPager.refresh();

                        const pageIndexChanged = (event.detail && event.detail.index !== undefined) || event.target.value !== undefined;

                        that._refreshPaging(pageIndexChanged);
                    });

                    pager.endUpdate();
                }

                addPropertyBindings(headerPager, 'header');
                addPropertyBindings(footerPager, 'footer');
                localizePager(headerPager);
                localizePager(footerPager);
            });
        }
    }
});

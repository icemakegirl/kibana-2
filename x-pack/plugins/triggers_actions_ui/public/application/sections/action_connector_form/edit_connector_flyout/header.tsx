/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { memo } from 'react';
import { css } from '@emotion/react';
import {
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiText,
  EuiFlyoutHeader,
  IconType,
  EuiBetaBadge,
  EuiTab,
  EuiTabs,
  useEuiTheme,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { i18n } from '@kbn/i18n';
import { EditConnectorTabs } from '../../../../types';

const FlyoutHeaderComponent: React.FC<{
  isPreconfigured: boolean;
  connectorName: string;
  connectorTypeDesc: string;
  selectedTab: EditConnectorTabs;
  setTab: () => void;
  icon?: IconType | null;
}> = ({ icon, isPreconfigured, connectorName, connectorTypeDesc, selectedTab, setTab }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiFlyoutHeader hasBorder data-test-subj="edit-connector-flyout-header">
      <EuiFlexGroup gutterSize="s" alignItems="center">
        {icon ? (
          <EuiFlexItem grow={false}>
            <EuiIcon type={icon} size="m" data-test-subj="edit-connector-flyout-header-icon" />
          </EuiFlexItem>
        ) : null}
        <EuiFlexItem>
          {isPreconfigured ? (
            <>
              <EuiTitle size="s">
                <h3 id="flyoutTitle">
                  <FormattedMessage
                    defaultMessage="{connectorName}"
                    id="xpack.triggersActionsUI.sections.preconfiguredConnectorForm.flyoutTitle"
                    values={{ connectorName }}
                  />
                  &emsp;
                  <EuiBetaBadge
                    label="Preconfigured"
                    data-test-subj="preconfiguredBadge"
                    tooltipContent={i18n.translate(
                      'xpack.triggersActionsUI.sections.preconfiguredConnectorForm.tooltipContent',
                      {
                        defaultMessage: 'This connector is preconfigured and cannot be edited',
                      }
                    )}
                  />
                </h3>
              </EuiTitle>
              <EuiText size="s">
                <FormattedMessage
                  defaultMessage="{connectorTypeDesc}"
                  id="xpack.triggersActionsUI.sections.editConnectorForm.actionTypeDescription"
                  values={{ connectorTypeDesc }}
                />
              </EuiText>
            </>
          ) : (
            <EuiTitle size="s">
              <h3 id="flyoutTitle">
                <FormattedMessage
                  defaultMessage="Edit connector"
                  id="xpack.triggersActionsUI.sections.editConnectorForm.flyoutPreconfiguredTitle"
                />
              </h3>
            </EuiTitle>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiTabs
        className="connectorEditFlyoutTabs"
        bottomBorder={false}
        css={css`
          margin-bottom: -${euiTheme.size.l};
        `}
      >
        <EuiTab
          onClick={setTab}
          data-test-subj="configureConnectorTab"
          isSelected={EditConnectorTabs.Configuration === selectedTab}
        >
          {i18n.translate('xpack.triggersActionsUI.sections.editConnectorForm.tabText', {
            defaultMessage: 'Configuration',
          })}
        </EuiTab>
        <EuiTab
          onClick={setTab}
          data-test-subj="testConnectorTab"
          isSelected={EditConnectorTabs.Test === selectedTab}
        >
          {i18n.translate('xpack.triggersActionsUI.sections.testConnectorForm.tabText', {
            defaultMessage: 'Test',
          })}
        </EuiTab>
      </EuiTabs>
    </EuiFlyoutHeader>
  );
};

export const FlyoutHeader = memo(FlyoutHeaderComponent);

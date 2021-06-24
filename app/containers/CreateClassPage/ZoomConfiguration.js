import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';
import Select from '../../components/Select';
import TextSwitch from '../../components/TextSwitch';
import Switch from '../../components/Switch';
import TalentClass from './TalentClassModel';

const Group = styled.div`
  margin: 50px 0;
  background-color: #eee;
  padding: 25px;
`;

export default function ZoomConfiguration({ model }) {
  const { setValue, control, watch } = useFormContext();
  const classUrlSource = watch(
    'classUrlSource',
    model.getDefault('classUrlSource'),
  );
  const isVirtual =
    watch('classType', model.getDefault('classType')) === 'virtual';

  useEffect(() => {
    const isGenerated = classUrlSource === 'generated';
    setValue('autoRecording', isGenerated);
    setValue('useClassParticipants', isGenerated);
  }, [classUrlSource]);

  useEffect(() => {
    setValue('classUrl', '');
    setValue('classUrlPasscode', '');
    setValue('autoRecording', isVirtual);
    setValue('useClassParticipants', isVirtual);
  }, [isVirtual]);

  return (
    <Group>
      <Row>
        <Col span={8}>
          <div>
            <label htmlFor="classType">Virtual Class</label>
          </div>
          <Controller
            name="classType"
            control={control}
            defaultValue={model.getDefault('classType')}
            render={data => (
              <TextSwitch
                {...data}
                trueValue="virtual"
                falseValue="face_to_face"
              />
            )}
          />
        </Col>

        {isVirtual && (
          <React.Fragment>
            <Col span={8}>
              <div>
                <label htmlFor="classUrlSource">Select a video option: </label>
                <Controller
                  name="classUrlSource"
                  control={control}
                  defaultValue={model.getDefault('classUrlSource')}
                  render={data => (
                    <Select
                      {...data}
                      options={[
                        {
                          text:
                            'I’ll use my own video service (i.e. Zoom account)',
                          value: 'user_provided',
                        },
                        {
                          text: 'I`ll use my own integrated zoom account',
                          value: 'zoom_integrated',
                        },
                        {
                          text: 'Generate a Zoom link for me',
                          value: 'generated',
                        },
                      ]}
                    />
                  )}
                />
              </div>
              {/* Auto recording */}
              {classUrlSource === 'generated' && (
                <div>
                  <br />
                  <label htmlFor="autoRecording">
                    Auto-record and upload to your on-demand library?
                  </label>
                  <div>
                    <Controller
                      name="autoRecording"
                      control={control}
                      defaultValue={model.getDefault('autoRecording')}
                      render={data => <Switch {...data} />}
                    />
                  </div>
                </div>
              )}
            </Col>
            {classUrlSource === 'user_provided' && (
              <Col span={8}>
                <div>
                  <label htmlFor="classUrl">
                    Link to class stream (i.e. Zoom)
                  </label>
                  <Controller
                    name="classUrl"
                    control={control}
                    defaultValue={model.getDefault('classUrl')}
                    render={data => <Input {...data.field} />}
                  />
                </div>
                <div>
                  <label htmlFor="classUrlPasscode">
                    Passcode (for Zoom meetings)
                  </label>
                  <Controller
                    name="classUrlPasscode"
                    control={control}
                    defaultValue={model.getDefault('classUrlPasscode')}
                    render={data => <Input {...data.field} />}
                  />
                </div>
              </Col>
            )}
            {classUrlSource === 'generated' && (
              <Col span={8}>
                <div>
                  Your zoom link will be available via your classes dashboard 20
                  minutes before class starts. Learn more
                </div>
                <br />
                <div>
                  <label htmlFor="useClassParticipants">
                    Automatically share class recording with live class
                    participants?
                  </label>
                  <div>
                    <Controller
                      name="useClassParticipants"
                      control={control}
                      defaultValue={model.getDefault('useClassParticipants')}
                      render={data => <Switch {...data} />}
                    />
                  </div>
                </div>
              </Col>
            )}
          </React.Fragment>
        )}
      </Row>
    </Group>
  );
}

ZoomConfiguration.propTypes = {
  model: PropTypes.instanceOf(TalentClass),
};

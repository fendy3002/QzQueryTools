# Render Configuration Specification
## Extension: `.html`
## Format
```xml
    <Web>
        <div class="card">
            <div class="card-block">
                <Table i="1" />
            </div>
        </div>
        <div class="card">
            <div class="card-block">
                <Summary i="2" />
            </div>
        </div>
        <div class="card">
            <div class="card-block">
                <Line i="3" />
            </div>
        </div>
    </Web>
    <Excel>
        <Workbook i="1" type="table">
            <Field key="name" header="Name" type="string"/>
        </Workbook>
        <Workbook i="2" type="summary">
        </Workbook>
        <Workbook i="3" type="line">
        </Workbook>
    </Excel>
```
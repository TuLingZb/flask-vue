"""测序表字段名称修改

Revision ID: a84ec68c381a
Revises: 28df1c07b903
Create Date: 2020-12-16 10:44:19.154617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a84ec68c381a'
down_revision = '28df1c07b903'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('results', schema=None) as batch_op:
        batch_op.drop_constraint('fk_results_sequence_id_sequence', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_results_sequence_id_sequence'), 'sequence', ['sequence_id'], ['sequence_id'])

    with op.batch_alter_table('sequence', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sample_id', sa.String(length=255), nullable=True))
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sequence', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.VARCHAR(length=255), nullable=True))
        batch_op.drop_column('sample_id')

    with op.batch_alter_table('results', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_results_sequence_id_sequence'), type_='foreignkey')
        batch_op.create_foreign_key('fk_results_sequence_id_sequence', 'sequence', ['sequence_id'], ['id'])

    # ### end Alembic commands ###
